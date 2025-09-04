import os
import traceback
import streamlit as st

from agent.graph import agent
from agent.tools import init_project_root


st.set_page_config(page_title="Coder Agent UI", page_icon="🤖", layout="wide")


def run_agent(user_prompt: str, recursion_limit: int = 100):
    try:
        init_project_root()
        with st.spinner("Running agent..."):
            result = agent.invoke({"user_prompt": user_prompt}, {"recursion_limit": recursion_limit})
        return result
    except Exception as e:
        st.error(f"Error: {e}")
        st.code(traceback.format_exc())
        return None


st.title("Coder Agent")
st.caption("Enter a project prompt and let the agent plan and implement a scaffolded project inside `generated_project/{project_name}`")
recursion_limit = 100

prompt = st.text_area("Project prompt", height=160, placeholder="Describe the app you want to build...")

col1, col2 = st.columns([1, 3])
with col1:
    run_clicked = st.button("Run Agent", type="primary", use_container_width=True)
with col2:
    clear_clicked = st.button("Clear Output", use_container_width=True)

if "output" not in st.session_state or clear_clicked:
    st.session_state.output = None

if run_clicked:
    if not prompt.strip():
        st.warning("Please enter a prompt first.")
    else:
        st.session_state.output = run_agent(prompt.strip(), recursion_limit)

if st.session_state.output is not None:
    st.subheader("Final State")
    st.json(st.session_state.output)

    # Prefer the agent-provided project_root; fallback to current root if missing
    project_root = st.session_state.output.get("project_root") if isinstance(st.session_state.output, dict) else None
    if not project_root:
        project_root = init_project_root()

    st.subheader("Generated Project")
    st.write(f"Location: `{project_root}`")
    for root, dirs, files in os.walk(project_root):
        dirs.sort()
        files.sort()
        depth = len(os.path.relpath(root, project_root).split(os.sep)) - 1
        indent = "    " * max(depth, 0)
        if root != project_root:
            st.text(f"{indent}📁 {os.path.basename(root)}")
        for f in files:
            st.text(f"{indent}    📄 {f}")


