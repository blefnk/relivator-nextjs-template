# 🐞 Please commit the changes to the repository before running the script.
# >> py addons\reliverse\relimter\python\tasks\migrate-from-barrel-fix-imports.py

import os
import re


def update_import_statements(directory):
    # List of words to match in the import statements
    words = [
        "Accordion",
        "Alert",
        "AlertDialog",
        "AspectRatio",
        "Avatar",
        "Badge",
        "Button",
        "Calendar",
        "Card",
        "Carousel",
        "Checkbox",
        "Command",
        "Dialog",
        "Drawer",
        "Dropdown",
        "Form",
        "Icon",
        "Input",
        "Label",
        "Password",
        "Popover",
        "Popup",
        "ScrollArea",
        "Select",
        "Separator",
        "Sheet",
        "Skeleton",
        "Slider",
        "Switch",
        "Table",
        "Tabs",
        "Textarea",
        "Toast",
        "Toaster",
        "Variants",
    ]

    # Create a regex pattern that includes all the words
    words_pattern = "|".join(words)
    pattern = re.compile(
        rf'(import\s*{{[^}}]*}}\s*from\s*"~\/components/Primitives/ui/({words_pattern})).*(";)',
        re.MULTILINE,
    )

    for root, _, files in os.walk(directory):
        for file in files:
            if (
                file.endswith(".js")
                or file.endswith(".ts")
                or file.endswith(".jsx")
                or file.endswith(".tsx")
            ):
                file_path = os.path.join(root, file)

                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()

                updated_content = pattern.sub(r"\1\3", content)

                if content != updated_content:
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(updated_content)
                    print(f"Updated file: {file_path}")


# Specify the src directory
src_directory = "src"
update_import_statements(src_directory)
