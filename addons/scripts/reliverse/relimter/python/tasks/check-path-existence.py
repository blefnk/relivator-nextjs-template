# 🐞 not fully finished and tested
# This script searches for the presence of specific patterns in TypeScript files.
# The script searches for join() usage and import statements of join from specific paths.
# ▶️ py addons\scripts\reliverse\relimter\python\tasks\check-path-existence.py

import os
import re


def get_root_dirname(current_dirname, levels_up):
    parent_directories = "../" * levels_up
    return os.path.abspath(os.path.join(current_dirname, parent_directories))


def evaluate_join_arguments(join_arguments):
    """
    Evaluates the join function arguments to return the constructed path.
    """
    try:
        # Replace any variables or functions with placeholder values as needed.
        # This should be handled based on the specific code context.
        path = eval(join_arguments, {"__builtins__": None}, {"join": os.path.join})
        return path
    except Exception as e:
        print(f"Error evaluating path: {e}")
        return None


def check_joins_in_files(base_dirs):
    join_pattern = re.compile(r"\bjoin\s*\(\s*(.*?)\s*\)")
    import_pattern = re.compile(r'import\s+.*\bjoin\b\s+from\s+["\'](.*?)["\']')

    for base_dir in base_dirs:
        for root, dirs, files in os.walk(base_dir):
            for file in files:
                if file.endswith((".ts", ".tsx")):
                    file_path = os.path.join(root, file)
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()

                    # Check for join usage and extract the arguments
                    matches = join_pattern.findall(content)
                    for match in matches:
                        print(f"Found join() usage in {file_path}: {match}")

                        # Evaluate the path if possible
                        path = evaluate_join_arguments(match)
                        if path:
                            if os.path.exists(path):
                                print(f"Path exists: {path}")
                            else:
                                print(f"Path does not exist: {path}")

                    # Check for imports of join to determine the used join function
                    import_matches = import_pattern.findall(content)
                    for import_match in import_matches:
                        print(
                            f"Found import of join from {import_match} in {file_path}"
                        )


base_dirs = ["addons", "src"]
check_joins_in_files(base_dirs)
