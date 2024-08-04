# ! 🔴 USE AT OWN RISK 🔴 ! IT IS NOT FINISHED YET AND NOT TESTED TOO MUCH !

# remember to run fix_type_imports.py after this script

import os
import re


def update_imports(content):
    # Find all occurrences of React.something
    react_usage = re.findall(r"React\.\w+", content)
    react_usage = set(react_usage)  # Remove duplicates

    if not react_usage:
        return content, False

    # Extract the component names without 'React.'
    react_components = {usage.split(".")[1] for usage in react_usage}

    # Remove 'React.' from the content
    updated_content = re.sub(r"React\.", "", content)

    # Generate the import statement for the found components
    import_statement = (
        f"import {{ {', '.join(sorted(react_components))} }} from 'react';\n"
    )

    # Check if there's already an import from 'react'
    if re.search(r"import\s+\{.*\}\s+from\s+'react';", updated_content):
        # Update existing import statement
        updated_content = re.sub(
            r"import\s+\{(.*)\}\s+from\s+'react';",
            lambda match: f"import {{ {', '.join(sorted(set(match.group(1).split(', ') + list(react_components)))).strip()} }} from 'react';",
            updated_content,
        )
    else:
        # Add new import statement at the top
        updated_content = import_statement + updated_content

    return updated_content, True


def process_file(filepath):
    with open(filepath, "r", encoding="utf-8") as file:
        content = file.read()

    updated_content, has_changes = update_imports(content)

    if has_changes:
        with open(filepath, "w", encoding="utf-8") as file:
            file.write(updated_content)
        print(f"Updated: {filepath}")


def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".ts") or file.endswith(".tsx"):
                process_file(os.path.join(root, file))


if __name__ == "__main__":
    src_directory = "../../src"  # Path to the src directory
    process_directory(src_directory)
