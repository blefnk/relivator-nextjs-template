# ! 🔴 USE AT OWN RISK 🔴 ! IT IS NOT FINISHED YET AND NOT TESTED TOO MUCH !

# Script to search for deprecated ESLint plugin rules
# Created by Nazar Kornienko https://github.com/blefnk

# To use - install Python and run - `py eslint.dep.py`

# TODO: Match both quoted and unquoted rules in config
# TODO: Currently only quoted properties are triggered
# TODO: "semi": "off" works, but semi: "off" - doesn't

import json
import re


def read_json(json_file):
    with open(json_file, "r") as f:
        return json.load(f)


def find_deprecated_rules(eslint_config, deprecated_rules):
    deprecated_in_config = []

    with open(eslint_config, "r") as f:
        content = f.read()

    for plugins, rules in deprecated_rules.items():
        for rule_obj in rules:
            rule = rule_obj["rule"]
            why = rule_obj["why"]
            # Match both "rule": "level" and "rule": ["level", ...]
            # And also handle multiline configurations in rules object
            pattern = rf'["\']{rule}["\']\s*:\s*(["\']?(error|warn|off)["\']?|[\[\{{].*?[\]\}}])'
            matches = re.finditer(pattern, content, re.DOTALL)
            for match in matches:
                start_line = content.count("\n", 0, match.start()) + 1
                deprecated_in_config.append((start_line, rule, why))

    return deprecated_in_config


def print_rule_with_location(file_path, line_num, rule, why, index):
    print(f"{index}. [{file_path}:{line_num}] {rule}: {why}")


def main():
    json_file = "addons/scripts/reliverse/relimter/python/data/find-eslint-dep-rules.json"
    eslint_config = "eslint.config.js"

    deprecated_rules = read_json(json_file)
    deprecated_in_config = find_deprecated_rules(eslint_config, deprecated_rules)

    if deprecated_in_config:
        print("\n❌ Deprecated rules found in your ESLint configuration file ❌")
        print("💡 After fixing, re-run the script to update the code lines 💡\n")
        for idx, (line_num, rule, why) in enumerate(deprecated_in_config, start=1):
            print_rule_with_location(eslint_config, line_num, rule, why, idx)
        print("")
    else:
        print("\n✅ Well done! No deprecated rules found in your ESLint config! ✅\n")


if __name__ == "__main__":
    main()
