# ! 🔴 USE AT OWN RISK 🔴 ! IT IS NOT FINISHED YET AND NOT TESTED TOO MUCH !

# Script to search for disabled ESLint plugin rules
# Created by Nazar Kornienko https://github.com/blefnk
# To use run `py src/tools/unstable/eslint-find-off.py` !!! FROM THE ROOT

import re


def extract_disabled_rules(file_content):
    # Match all rule definitions set to "off"
    rule_matches = re.findall(r'"([^"]+)"\s*:\s*"off"', file_content)

    disabled_rules = {rule: "off" for rule in rule_matches}
    return disabled_rules


def print_disabled_rules(disabled_rules):
    for rule, status in disabled_rules.items():
        print(f'  "{rule}": "{status}",')


def main():
    eslint_config_file = "eslint.config.js"  # ESLint config file path

    with open(eslint_config_file, "r") as file:
        file_content = file.read()

    disabled_rules = extract_disabled_rules(file_content)
    print_disabled_rules(disabled_rules)


if __name__ == "__main__":
    main()
