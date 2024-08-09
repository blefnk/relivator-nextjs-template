# 🐞 Please commit the changes to the repository before running the script.
# >> py addons\reliverse\relimter\python\tasks\barrel-files-to-direct-paths.py

import os
import re
from collections import defaultdict

# Component mappings
component_mappings = {
    "Accordion": "ui/Accordion",
    "Alert": "ui/Alert",
    "AlertDialog": "ui/AlertDialog",
    "AspectRatio": "ui/AspectRatio",
    "Avatar": "ui/Avatar",
    "Badge": "ui/Badge",
    "Button": "ui/Button",
    "Calendar": "ui/Calendar",
    "Card": "ui/Card",
    "Carousel": "ui/Carousel",
    "Checkbox": "ui/Checkbox",
    "Command": "ui/Command",
    "Dialog": "ui/Dialog",
    "Drawer": "ui/Drawer",
    "Dropdown": "ui/Dropdown",
    "Form": "ui/Form",
    "FormControl": "ui/FormControl",
    "FormField": "ui/FormField",
    "FormItem": "ui/FormItem",
    "FormLabel": "ui/FormLabel",
    "FormMessage": "ui/FormMessage",
    "Icon": "ui/Icon",
    "Input": "ui/Input",
    "Label": "ui/Label",
    "Password": "ui/Password",
    "Popover": "ui/Popover",
    "Popup": "ui/Popup",
    "ScrollArea": "ui/ScrollArea",
    "Select": "ui/Select",
    "Separator": "ui/Separator",
    "Sheet": "ui/Sheet",
    "Skeleton": "ui/Skeleton",
    "Slider": "ui/Slider",
    "Switch": "ui/Switch",
    "Table": "ui/Table",
    "Tabs": "ui/Tabs",
    "Textarea": "ui/Textarea",
    "Toast": "ui/Toast",
    "Toaster": "ui/Toaster",
    "Variants": "ui/Variants",
}

base_path = "~/components/Primitives"


# Function to replace imports in a file
def replace_imports(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()

    # Pattern to match imports from ~/components/Primitives
    pattern = (
        r'import\s*\{([^}]*)\}\s*from\s*[\'"]' + re.escape(base_path) + r'[\'"]\s*;?'
    )
    matches = re.finditer(pattern, content, re.MULTILINE)

    if not matches:
        return  # No matches, skip the file

    original_content = content  # Keep a copy of the original content
    imports = defaultdict(list)

    for match in matches:
        import_statements = match.group(1).split(",")
        for imp in import_statements:
            imp = imp.strip()
            if imp in component_mappings:
                path = component_mappings[imp]
                imports[path].append(imp)
            else:
                if imp:  # Avoid empty import entries
                    imports[imp].append(imp)

    new_imports = []
    for path, components in imports.items():
        new_imports.append(
            f'import {{ {", ".join(components)} }} from "{base_path}/{path}";'
        )

    # Join the new imports
    new_import_str = "\n".join(new_imports)
    # Replace old import with new imports
    content = re.sub(pattern, "", content)  # Remove old imports
    content = new_import_str + "\n" + content  # Add new imports at the top

    # Trim whitespace
    content = content.strip() + "\n"

    # Write back to the file only if there are changes
    if content.strip() != original_content.strip():
        with open(file_path, "w", encoding="utf-8") as file:
            file.write(content)


# Function to check if the import is already a direct path
def is_direct_path(import_statement):
    # If the import statement contains '/ui/' it is already a direct path
    return "/ui/" in import_statement


# Traverse the src directory and process .ts and .tsx files
for root, dirs, files in os.walk("src"):
    for file in files:
        if file.endswith(".ts") or file.endswith(".tsx"):
            file_path = os.path.join(root, file)
            with open(file_path, "r", encoding="utf-8") as file:
                content = file.read()
                # Skip the file if it already has direct paths
                if not any(is_direct_path(line) for line in content.splitlines()):
                    replace_imports(file_path)

print("Import paths updated successfully.")
