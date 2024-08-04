# ! 🔴 USE AT OWN RISK 🔴 ! IT IS NOT FINISHED YET AND NOT TESTED TOO MUCH !

import os


def process_file(filepath):
    with open(filepath, "r", encoding="utf-8") as file:
        lines = file.readlines()

    # Check if 'cn' is imported and used
    cn_imported = False
    cn_used = False
    import_line_index = None

    for idx, line in enumerate(lines):
        if "import {" in line and 'from "~/utils"' in line:
            if "cn" in line:
                cn_imported = True
                import_line_index = idx
        if "cn(" in line:
            cn_used = True

    # If 'cn' is imported but not used, remove it from the import line or the entire import line if 'cn' is the only import
    if cn_imported and not cn_used:
        line_parts = lines[import_line_index].strip().split(" ")
        if len(line_parts) == 4 and line_parts[1] == "cn,":
            lines.pop(import_line_index)
        else:
            lines[import_line_index] = (
                lines[import_line_index].replace("cn,", "").replace("cn", "").strip()
            )
            if lines[import_line_index].endswith(","):
                lines[import_line_index] = lines[import_line_index][:-1]
            lines[import_line_index] += "\n"

    with open(filepath, "w", encoding="utf-8") as file:
        file.writelines(lines)


def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if (
                file.endswith(".ts")
                or file.endswith(".tsx")
                or file.endswith(".js")
                or file.endswith(".jsx")
            ):
                process_file(os.path.join(root, file))


if __name__ == "__main__":
    directory = "../.."  # The path to the directory
    process_directory(directory)
