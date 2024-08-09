# ! 🔴 USE AT OWN RISK 🔴 ! IT IS NOT FINISHED YET AND NOT TESTED TOO MUCH !

import json


def generate_markdown_table(package_json_path):
    """
    Reads a package.json file, generates a markdown table of dependencies with continuous numbering,
    and writes the table to 'deps.log' in the current directory.
    """
    try:
        # Read package.json file
        with open(package_json_path, "r") as file:
            data = json.load(file)

        # Extract dependencies
        dependencies = data.get("dependencies", {})
        dev_dependencies = data.get("devDependencies", {})

        # Separating categories
        unsorted_packages = []
        eslint_plugins = []
        radix_udecode = []
        next_react = []
        cspell = []
        types = []

        # Check each dependency and categorize
        for package in {**dependencies, **dev_dependencies}:
            if package.startswith("eslint-plugin-"):
                eslint_plugins.append(package)
            elif package.startswith("@radix-ui/") or package.startswith("@udecode/"):
                radix_udecode.append(package)
            elif package.startswith("react-") or package.startswith("next-"):
                next_react.append(package)
            elif package.startswith("@cspell/"):
                cspell.append(package)
            elif package.startswith("@types/"):
                types.append(package)
            else:
                unsorted_packages.append(package)

        # Determine the longest list for table formatting
        max_length = max(
            len(unsorted_packages),
            len(radix_udecode),
            len(next_react),
            len(eslint_plugins),
            len(cspell),
            len(types),
        )

        # Ensure all lists are the same length for the table
        unsorted_packages += [""] * (max_length - len(unsorted_packages))
        radix_udecode += [""] * (max_length - len(radix_udecode))
        next_react += [""] * (max_length - len(next_react))
        eslint_plugins += [""] * (max_length - len(eslint_plugins))
        cspell += [""] * (max_length - len(cspell))
        types += [""] * (max_length - len(types))

        # Generate markdown table
        markdown_table = "## Table of Dependencies\n\n"
        markdown_table += "| Unsorted Packages | Radix/Udecode | ESLint Plugins | React/Next | CSpell | Types |\n"
        markdown_table += "| ----------------- | ------------- | -------------- | ---------- | ------ | ----- |\n"

        counter = 1
        for i in range(max_length):
            # Adding continuous numbers to non-empty package names
            up = f"{counter}. {unsorted_packages[i]}" if unsorted_packages[i] else ""
            counter += 1 if unsorted_packages[i] else 0

            ru = f"{counter}. {radix_udecode[i]}" if radix_udecode[i] else ""
            counter += 1 if radix_udecode[i] else 0

            ep = f"{counter}. {eslint_plugins[i]}" if eslint_plugins[i] else ""
            counter += 1 if eslint_plugins[i] else 0

            rn = f"{counter}. {next_react[i]}" if next_react[i] else ""
            counter += 1 if next_react[i] else 0

            cs = f"{counter}. {cspell[i]}" if cspell[i] else ""
            counter += 1 if cspell[i] else 0

            ty = f"{counter}. {types[i]}" if types[i] else ""
            counter += 1 if types[i] else 0

            markdown_table += f"| {up} | {ru} | {ep} | {rn} | {cs} | {ty} |\n"

        # Write the markdown table to a file
        with open("deps.log", "w") as md_file:
            md_file.write(markdown_table)

        return "Markdown table with continuous numbering written to 'deps.log'."

    except FileNotFoundError:
        return "The specified package.json file was not found."
    except json.JSONDecodeError:
        return "Invalid JSON in the package.json file. Please provide a valid package.json file."


# Path to the package.json file
package_json_path = "../../../../package.json"

# Execute the function and get the output message
output_message = generate_markdown_table(package_json_path)
