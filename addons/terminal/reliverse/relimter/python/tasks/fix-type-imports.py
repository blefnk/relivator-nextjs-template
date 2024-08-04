# ! 🔴 USE AT OWN RISK 🔴 ! IT IS NOT FINISHED YET AND NOT TESTED TOO MUCH !

import os
import re


def process_file(filepath):
    with open(filepath, "r", encoding="utf-8") as file:
        content = file.readlines()

    pattern = re.compile(r"import\s+{(.+?)}\s+from\s+['\"]react['\"];")
    updated_content = []

    for line in content:
        match = pattern.search(line)
        if match:
            imports = match.group(1).split(",")
            imports = [imp.strip() for imp in imports]

            type_imports = [imp for imp in imports if imp[0].isupper()]
            non_type_imports = [imp for imp in imports if not imp[0].isupper()]

            if type_imports and not non_type_imports:
                new_line = f"import {{ {', '.join(imports)} }} from 'react';\n"
            else:
                imports = [
                    f"type {imp}" if imp in type_imports else imp for imp in imports
                ]
                new_line = f"import {{ {', '.join(imports)} }} from 'react';\n"

            updated_content.append(new_line)
        else:
            updated_content.append(line)

    if content != updated_content:
        with open(filepath, "w", encoding="utf-8") as file:
            file.writelines(updated_content)
        print(f"Updated: {filepath}")


def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".ts") or file.endswith(".tsx"):
                process_file(os.path.join(root, file))


if __name__ == "__main__":
    src_directory = "../../src"  # Path to the src directory
    process_directory(src_directory)
