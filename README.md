# Coder Agent

An agentic engineering assistant that plans, architects, and scaffolds projects from a natural-language prompt. It uses LangGraph with a Planner → Architect → Coder flow and writes output files under a dynamically named project directory: `gen/<slug-of-plan-or-prompt>`.

## Features
- Planner agent converts your prompt into a structured `Plan` (name, description, techstack, features, files).
- Architect agent produces an ordered `TaskPlan` of implementation steps.
- Coder agent executes steps, reading/writing files using constrained tools.
- Streamlit UI for entering prompts and previewing generated files.
- Dynamic project directory naming based on the plan name or the prompt.

## Requirements
- Python 3.10+
- A Groq API key with access to the configured model

## Installation
```bash
cd /root/Projects/Agents/Coder
python -m pip install -e .
```

## Environment
Create a `.env` file in the project root:
```bash
GROQ_API_KEY=your_groq_api_key
```
You can also provide `GROQ_API_KEY` at runtime via environment variable or in the Streamlit sidebar.

## Usage

### Run via CLI
```bash
python -m coder.main
# or
python main.py
```
- You will be prompted for your project description.
- The agent will plan, architect, and implement files.
- Output is written under `gen/<slug>` where `<slug>` is derived from the plan name, falling back to your prompt.

### Run the Streamlit UI
```bash
python -m streamlit run main.py --server.headless=true --server.port=8501
# If you kept a separate UI script, use:
# python -m streamlit run streamlit_app.py --server.headless=true --server.port=8501
```
- Open `http://localhost:8501` in your browser.
- Enter a prompt, run the agent, and view the generated project tree.

## Project Output Directory
- The project root is set dynamically to `gen/<slug>` where `<slug>` is a URL-friendly version of the Plan name.
- If the Plan name is missing, the slug is derived from your original prompt.
- All tool-based file operations (read/write/list) are constrained to this directory.

## Architecture
- `agent/states.py`: Pydantic models (`Plan`, `TaskPlan`, `ImplementationTask`, `CoderState`).
- `agent/prompts.py`: Orchestrator prompts for Planner/Architect/Coder.
- `agent/tools.py`: Tooling utilities and I/O tools exposed to the agent:
  - `write_file(path, content)`
  - `read_file(path)`
  - `list_files(directory)`
  - `get_current_directory()`
  - `run_cmd(cmd, cwd, timeout)`
  - `set_project_root_from_name(name)` and `init_project_root()`
- `agent/graph.py`: LangGraph setup with nodes:
  - Planner → Architect → Coder; loops coder until done
  - Sets project directory based on the Plan name (fallback prompt)

## Configuration
- Model is configured in `agent/graph.py` via `ChatGroq`:
  - `ChatGroq(model="openai/gpt-oss-120b", api_key=os.getenv("GROQ_API_KEY"))`
- Adjust verbosity with LangChain globals if needed.

## Development
- Linting is handled by your editor; ensure no syntax errors.
- The tools enforce a safe project root; writing outside `gen/<slug>` will error.

## Notes
- Streamlit should be launched with `streamlit run ...` (not `python ...`).
- If running in WSL2, access the UI at `http://localhost:8501` from Windows.
## Sample
<img width="1894" height="874" alt="2025-09-04" src="https://github.com/user-attachments/assets/b9e0e2b8-e288-4cf6-9401-64a1d7a39cca" />
## License
MIT (or your preferred license)
