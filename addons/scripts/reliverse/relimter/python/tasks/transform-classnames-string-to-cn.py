# ! 🔴 USE AT OWN RISK 🔴 ! IT IS NOT FINISHED YET AND NOT TESTED TOO MUCH !

import os
import re


def process_file(filepath):
    with open(filepath, "r", encoding="utf-8") as file:
        lines = file.readlines()

    transformed_lines = []
    class_name_pattern = re.compile(r'(className="[^"]{80,}")')

    # Ensure 'cn' is imported from '~/utils'
    cn_imported = False
    utils_import_found = False
    utils_import_line = None

    for idx, line in enumerate(lines):
        if "import {" in line and 'from "~/utils"' in line:
            utils_import_found = True
            utils_import_line = idx
            if "cn" in line:
                cn_imported = True

    if utils_import_found and not cn_imported:
        line_parts = lines[utils_import_line].strip().split(" ")
        if "cn" not in line_parts:
            line_parts.insert(1, "cn,")
            lines[utils_import_line] = " ".join(line_parts) + "\n"
    elif not cn_imported:
        lines.insert(0, 'import { cn } from "@/utils/reliverse/cn";\n')

    for line in lines:
        match = class_name_pattern.search(line.strip())
        if match:
            class_value = match.group(0)
            class_content = class_value[11:-1]
            split_classes = class_content.split()
            new_class_name = (
                "className={cn(\n            "
                + ",\n            ".join(
                    f'"{split_classes[i]}"' for i in range(len(split_classes))
                )
                + ",\n          )}"
            )
            line = line.replace(class_value, new_class_name)
        transformed_lines.append(line)

    with open(filepath, "w", encoding="utf-8") as file:
        file.writelines(transformed_lines)


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
