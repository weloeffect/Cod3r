from langchain_groq import ChatGroq
from langchain.globals import set_verbose, set_debug
from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import ToolNode, create_react_agent
from pydantic import BaseModel
from agent.states import *
from agent.prompts import *
from agent.tools import *
from dotenv import load_dotenv
import os

load_dotenv()

set_debug(True)
set_verbose(True)




llm = ChatGroq(model="openai/gpt-oss-120b", api_key=os.getenv("GROQ_API_KEY"))

# agent 1: Planner agent
def planner_agent(state: dict) -> dict:
    """Converts user prompt into a structured Plan."""
    user_prompt = state["user_prompt"]
    resp = llm.with_structured_output(Plan).invoke(
        planner_prompt(user_prompt)
    )
    if resp is None:
        raise ValueError("Planner did not return a valid response.")
    project_root = set_project_root_from_name(getattr(resp, "name", user_prompt))
    return {"plan": resp, "project_root": project_root}
# agent 2: Architect agent
def architect_agent(state: dict) -> dict:
    """Creates TaskPlan from Plan."""
    plan: Plan = state["plan"]
    resp = llm.with_structured_output(TaskPlan).invoke(
        architect_prompt(plan=plan.model_dump_json())
    )
    if resp is None:
        raise ValueError("Planner did not return a valid response.")

    resp.plan = plan
    print(resp.model_dump_json())
    return {"task_plan": resp}

# agent 3: Coder agent
def coder_agent(state: dict) -> dict:
    """LangGraph tool-using coder agent."""
    coder_state: CoderState = state.get("coder_state")
    if coder_state is None:
        coder_state = CoderState(task_plan=state["task_plan"], current_step_idx=0)

    steps = coder_state.task_plan.implementation_steps
    if coder_state.current_step_idx >= len(steps):
        return {"coder_state": coder_state, "status": "DONE"}

    current_task = steps[coder_state.current_step_idx]
    existing_content = read_file.run(current_task.filepath)

    system_prompt = coder_system_prompt()
    user_prompt = (
        f"Task: {current_task.task_description}\n"
        f"File: {current_task.filepath}\n"
        f"Existing content:\n{existing_content}\n"
        "Use write_file(path, content) to save your changes."
    )

    coder_tools = [read_file, write_file, list_files, get_current_directory]
    react_agent = create_react_agent(llm, coder_tools)

    react_agent.invoke({"messages": [{"role": "system", "content": system_prompt},
                                     {"role": "user", "content": user_prompt}]})

    coder_state.current_step_idx += 1
    return {"coder_state": coder_state}




graph_builder = StateGraph(dict)
graph_builder.add_node("planner", planner_agent)
graph_builder.add_node("architect", architect_agent)
graph_builder.add_node("coder", coder_agent)
graph_builder.add_edge("planner", "architect")
graph_builder.add_edge("architect", "coder")
graph_builder.add_conditional_edges(
    "coder",
    lambda s: "END" if s.get("status") == "DONE" else "coder",
    {"END": END, "coder": "coder"}
)
graph_builder.set_entry_point("planner")
agent = graph_builder.compile()
