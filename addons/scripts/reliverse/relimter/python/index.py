# Created by @blefnk for https://github.com/blefnk/relivator-nextjs-template

# 🔥 Before learning this file, please ensure you've read "Python" section in README.md
# 👋 Please read the instruction below to learn even more on how to use this script manager
# 👉 Run script manager using: py addons/scripts/reliverse/relimter/python/index.py

# This is a Python script that runs a Python script from a list of Python scripts in a directory.
# This one may be a useful alternative to `addons/scripts/reliverse/relimter/python/index.ts` when it's failing.
# Please note that both script manager implementations are not fully finished and not fully tested.

# Ensure you have the ".venv" folder located in the "addons/scripts/reliverse/relimter/python/tasks" folder (🔥 EXAMPLE FOR WINDOWS):
# [1] Install https://astral.sh and run "venv" inside "cd addons/scripts/reliverse/relimter/python/tasks" folder.
# [2] Install the Python and Ruff extensions for VSCode.
# [3] Press "Ctrl+Shift+P" in VSCode --> ">Python: Select Interpreter" --> set this path (example for Windows):
# ".venv/Scripts/python.exe"
# [4] Run .venv/Scripts/activate from the root to activate the virtual environment.
# [5] Navigate to the "addons/scripts/reliverse/relimter/python/tasks" directory by using the "cd" command in the terminal.
# [6] And, finally, run "pip sync requirements.txt" command.
# Almost all scripts are untested. Please commit your code before running any script, just in case.
# No worries! We'll test if you have everything set up correctly.
# Please visit https://discord.gg/Pb8uKbwpsJ if you need any help.
# Before running the script manager, please make your VSCode terminal window size higher to avoid some UI glitches.

import json
import logging
import os
import subprocess
import sys
from pathlib import Path
from typing import Any, Dict, List

import click
from InquirerPy import inquirer

# Setup logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Utility functions


def check_path_exists(path: Path, description: str):
    if not path.exists():
        logger.error(f"{description} not found at {path}")
        raise FileNotFoundError(f"{description} not found at {path}")


def get_flags(script_files: List[Dict[str, Any]]) -> List[str]:
    return [f"--{script['index']}" for script in script_files]


def get_script_files(paths: List[Path]) -> List[Dict[str, Any]]:
    script_files = []
    for path in paths:
        check_path_exists(path, f"Script directory {path}")
        for idx, script_file in enumerate(path.glob("*.py"), 1):
            script_files.append(
                {
                    "file": script_file.name,
                    "name": script_file.stem,
                    "index": idx,
                    "hint": "No description available",
                    "path": script_file.parent,
                }
            )
    return script_files


def instructions() -> str:
    # is_windows = os.name == "nt"
    # current_directory = (
    #     "addons\\reliverse\\relimter\\python\\tasks"
    #     if is_windows
    #     else "addons/scripts/reliverse/relimter/python/tasks"
    # )
    # venv_path = ".venv\\Scripts\\python.exe" if is_windows else ".venv/bin/python3"
    # venv_path_activate = (
    #     ".venv\\Scripts\\activate" if is_windows else ".venv/bin/activate"
    # )

    return (
        "👋 Hello! Nice to see you here! I (@blefnk Nazar Kornienko) have a dream of making the open-source world better and higher quality.\n"
        "I aspire to leave my mark in history by ensuring people genuinely enjoy programming and create quality products.\n"
        "I'm particularly passionate about clean code. The book 'Clean Code' by Robert Martin is a must-have!\n"
        "That's why I've developed numerous tools in Relivator. Over the past few months leading to Relivator 1.2.6, I've learned a lot.\n"
        "To avoid manually rewriting code, I'm developing a unified script manager, @reliverse/relimter/python. This version is still very unstable.\n"
        "You can visit the 'addons/scripts/reliverse/relimter/python/index.py' file to learn more about how this script manager works.\n\n"
        "🔥 Most scripts are untested. Commit your code before running any script.\n"
        "🌐 Need help? Visit our [Discord](https://discord.gg/Pb8uKbwpsJ).\n"
        "🔧 Increase your VSCode terminal window size to avoid UI glitches.\n"
        "📂 Please ensure your workspace is properly prepared. If you are not sure:\n"
        "⚙️ Please visit the Scripts and Python sections in the README.md file. After\n"
        "   following the instructions there, just re-run this script manager.\n\n"
        "💡 Are you ready to run this Python Script Manager?\n"
    )


def validate_python_installation(path_venv: Path):
    check_path_exists(path_venv, "Python virtual environment")


def run_script_python(file: str, name: str, path_venv: Path, path: Path, index: int):
    script_path = path / file
    python_executable = path_venv

    # logger.info(
    #     f"Running script {name} located at {script_path} with {python_executable}"
    # )

    if not python_executable.exists():
        logger.error(f"Python executable not found at {python_executable}")
        raise FileNotFoundError(f"Python executable not found at {python_executable}")

    if not script_path.exists():
        logger.error(f"Script file not found at {script_path}")
        raise FileNotFoundError(f"Script file not found at {script_path}")

    try:
        subprocess.run([str(python_executable), str(script_path)], check=True)
        # logger.info(f"Successfully ran {name} from {script_path}")
        logger.info(f"Successfully ran {name}")
    except subprocess.CalledProcessError as e:
        logger.error(f"Error running script {name}: {e}")
    except Exception as e:
        logger.error(f"Unexpected error running script {name}: {e}")


def get_current_dirname() -> Path:
    return Path(__file__).parent


def define_addon(icon: str, name: str, description: str, enter: str) -> str:
    return f"{icon} {name} - {description}: {enter}"


def load_config(path: Path) -> Dict[str, Any]:
    if path.exists():
        with open(path, "r") as file:
            return json.load(file)
    return {}


def save_config(path: Path, config: Dict[str, Any]):
    with open(path, "w") as file:
        json.dump(config, file, indent=4)


def display_final_message():
    print(
        "Script manager executed successfully.\n"
        "________________________________________________________________________\n"
    )


# Main script

current_dirname = get_current_dirname()
venv_directory = ".venv/Scripts/python.exe" if os.name == "nt" else ".venv/bin/python3"
path_venv = (current_dirname / "../../../.." / venv_directory).resolve()
paths_scripts = [
    current_dirname / "tasks",
]
config_path = current_dirname / "data/script-manager-filter.json"

config = load_config(config_path)
excluded_scripts_from_automatic_mode = config.get(
    "excluded_scripts_from_automatic_mode",
    ["database-convert.py", "database-compare.py"],
)
excluded_scripts_from_menu_mode = config.get("excluded_scripts_from_menu_mode", [])

script_files = get_script_files(paths_scripts)
flags = get_flags(script_files)

with_flag = any(flag in sys.argv for flag in flags)


@click.command()
@click.argument("script_index", required=False, type=int)
def main(script_index):
    click.clear()
    accepted = inquirer.confirm(message=instructions(), default=True).execute()
    if accepted:
        display_final_message()
        mode = inquirer.select(
            message="Select mode (or press <Cmd/Ctrl+C> to exit):",
            choices=[
                "- Menu Mode (✅ recommended)",
                "- Automatic Mode (⛔ Unstable | Runs all scripts one by one)",
                "- Configure Exclusions (💡 addons/scripts/reliverse/relimter/python/data/script-manager-filter.json)",
            ],
        ).execute()
        if with_flag:
            with_argument(script_index)
        elif mode == "- Menu Mode (✅ recommended)":
            menu_mode()
        elif mode == "- Automatic Mode (⛔ Unstable | Runs all scripts one by one)":
            automatic_mode()
        elif (
            mode
            == "- Configure Exclusions (💡 addons/scripts/reliverse/relimter/python/data/script-manager-filter.json)"
        ):
            configure_exclusions()
        else:
            print(
                "⛔ Something went wrong. Please check def main(script_index) in addons/scripts/reliverse/relimter/python/index.py file."
            )


def with_argument(script_index: int):
    validate_python_installation(path_venv)
    flag_index = script_index or int(sys.argv[2].replace("--", ""))
    selected_script = next(
        (script for script in script_files if script["index"] == flag_index), None
    )

    if selected_script:
        run_script_python(
            selected_script["file"],
            selected_script["name"],
            path_venv,
            selected_script["path"],
            selected_script["index"],
        )


def automatic_mode_message() -> str:
    return (
        "🔥 Do you really wish to continue in automatic mode? Have you made a commit to the codebase, for example, to GitHub? \n"
        "At the moment, this may (or may not) break your codebase, and additional manual work in the code may (or may not) be required. \n"
        "If you are ready to take responsibility, press <Y> to proceed. Press <N> to exit.\n\n"
        "✅ P.S. In Relivator 1.2.6, only safe scripts are executed in this Automatic Mode, so you can try this mode if you \nhaven't changed exclusions in the following file (🔥 it's still highly recommended to commit your code first): \n"
        "addons/scripts/reliverse/relimter/python/data/script-manager-filter.json \n"
    )


def automatic_mode():
    accepted = inquirer.confirm(
        message=automatic_mode_message(), default=False
    ).execute()
    if accepted:
        validate_python_installation(path_venv)
        for script in script_files:
            if script["file"] not in excluded_scripts_from_automatic_mode:
                script_path = script["path"] / script["file"]
                print(
                    f"\n==================================\n"
                    f"⌛ Executing script at path: {script_path}\n"
                    f"==================================\n"
                )
                run_script_python(
                    script["file"],
                    script["name"],
                    path_venv,
                    script["path"],
                    script["index"],
                )
                print(
                    f"\n==================================\n"
                    f"✅ Script at path: {script_path}\n"
                    f"completed execution. It's recommended to check if your codebase is not broken after executing this script.\n"
                    f"==================================\n"
                )


def menu_mode():
    validate_python_installation(path_venv)
    if not script_files:
        print(
            "No scripts found in the specified directories. \nPlease check the paths and ensure there are Python scripts to run."
        )
        return

    choices = [
        f"{script['index']}. {' '.join(word.capitalize() for word in script['name'].split('-'))}"
        for script in script_files
        if script["file"] not in excluded_scripts_from_menu_mode
    ]
    selected = inquirer.select(
        message="\n⛔ Almost all scripts are unstable\n🔥 Please use at your own risk\n💡 Commit your code before using any script\n\n🎯 Select the Python script to run (You can use Cmd/Ctrl+C anywhere to exit):\n",
        choices=choices,
    ).execute()

    selected_script = next(
        (
            script
            for script in script_files
            if f"{script['index']}. {' '.join(word.capitalize() for word in script['name'].split('-'))}"
            == selected
        ),
        None,
    )

    if selected_script:
        run_script_python(
            selected_script["file"],
            selected_script["name"],
            path_venv,
            selected_script["path"],
            selected_script["index"],
        )


def configure_exclusions():
    def get_exclusion_label(script):
        excluded_modes = []
        if script["file"] in excluded_scripts_from_automatic_mode:
            excluded_modes.append("Automatic Mode")
        if script["file"] in excluded_scripts_from_menu_mode:
            excluded_modes.append("Menu Mode")
        if not excluded_modes:
            return script["file"]
        return f"{script['file']} (excluded for: {', '.join(excluded_modes)})"

    selected_scripts = inquirer.checkbox(
        message="Select scripts to exclude (<space> to select, <enter> to proceed, <cmd/ctrl+c> to exit):",
        choices=[
            {
                "name": get_exclusion_label(script),
                "value": script["file"],
            }
            for script in script_files
        ],
    ).execute()

    global excluded_scripts_from_automatic_mode, excluded_scripts_from_menu_mode

    for script in selected_scripts:
        mode_choice = inquirer.select(
            message=f"Select mode(s) to exclude '{script}' from:",
            choices=[
                "Automatic Mode",
                "Menu Mode",
                "Both Automatic and Menu Mode",
                "None",
            ],
        ).execute()

        if mode_choice == "Automatic Mode":
            if script not in excluded_scripts_from_automatic_mode:
                excluded_scripts_from_automatic_mode.append(script)
            if script in excluded_scripts_from_menu_mode:
                excluded_scripts_from_menu_mode.remove(script)
        elif mode_choice == "Menu Mode":
            if script not in excluded_scripts_from_menu_mode:
                excluded_scripts_from_menu_mode.append(script)
            if script in excluded_scripts_from_automatic_mode:
                excluded_scripts_from_automatic_mode.remove(script)
        elif mode_choice == "Both Automatic and Menu Mode":
            if script not in excluded_scripts_from_automatic_mode:
                excluded_scripts_from_automatic_mode.append(script)
            if script not in excluded_scripts_from_menu_mode:
                excluded_scripts_from_menu_mode.append(script)
        elif mode_choice == "None":
            if script in excluded_scripts_from_automatic_mode:
                excluded_scripts_from_automatic_mode.remove(script)
            if script in excluded_scripts_from_menu_mode:
                excluded_scripts_from_menu_mode.remove(script)

    config["excluded_scripts_from_automatic_mode"] = (
        excluded_scripts_from_automatic_mode
    )
    config["excluded_scripts_from_menu_mode"] = excluded_scripts_from_menu_mode

    save_config(config_path, config)
    logger.info(
        f"\n\nEXCLUDED SCRIPTS FOR AUTOMATIC MODE CURRENTLY INCLUDES:\n{excluded_scripts_from_automatic_mode}\n"
    )
    logger.info(
        f"\nEXCLUDED SCRIPTS FOR MENU MODE CURRENTLY INCLUDES:\n{excluded_scripts_from_menu_mode}"
    )


if __name__ == "__main__":
    main()
