# ⛔ UNFINISHED | USAGE IS NOT RECOMMENDED
# pnpm reli:python --> Menu Mode --> Toggle All Eslint Rules

import re


def toggle_eslint_rules(file_path):
    with open(file_path, "r") as file:
        lines = file.readlines()

    updated_lines = []
    for line in lines:
        # Regex patterns for finding rules set between "off" and "error"
        if re.search(r'"[^"]+":\s*"off"', line):
            # Replace "off" with "error"
            line = re.sub(r'(".*":\s*)"off"', r'\1"error"', line)
        elif re.search(r'"[^"]+":\s*"error"', line):
            # Replace "error" with "off"
            line = re.sub(r'(".*":\s*)"error"', r'\1"off"', line)
        updated_lines.append(line)

    # Write the modified content back to the file
    with open(file_path, "w") as file:
        file.writelines(updated_lines)

    print(f"Toggled rules in {file_path}")


eslint_config_path = "eslint.config.js"

toggle_eslint_rules(eslint_config_path)
