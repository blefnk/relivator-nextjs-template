# 🐞 NOT TESTED TOO MUCH (some additional work may be required)
# This script is used to replace the Icons import and usage in your project with the direct icons import.
# ▶️ py addons\scripts\reliverse\relimter\python\tasks\replace-icon-imports.py

import os
import re

# Define the icon mappings based on your index.tsx file
icon_mappings = {
    "accessories": "HardHat",
    "add": "Plus",
    "addCircle": "PlusCircle",
    "alarm": "AlarmClock",
    "arrowDown": "ArrowDown",
    "arrowUp": "ArrowUp",
    "billing": "CreditCard",
    "calendar": "CalendarDays",
    "cart": "ShoppingCart",
    "chart": "BarChart3",
    "check": "Check",
    "chevronDown": "ChevronDown",
    "chevronLeft": "ChevronLeft",
    "chevronRight": "ChevronRight",
    "chevronsLeft": "ChevronsLeft",
    "chevronsRight": "ChevronsRight",
    "chevronUp": "ChevronUp",
    "chevronUpDown": "ChevronsUpDown",
    "circle": "Circle",
    "close": "X",
    "clothing": "Shirt",
    "Coffe": "BMaCoffeSVG",
    "copy": "Copy",
    "crop": "Crop",
    "discord": "DiscordLogoIcon",
    "dollarSign": "DollarSign",
    "download": "Download",
    "edit": "Edit",
    "facebook": "FacebookSVG",
    "filter": "Filter",
    "Github": "GithubSVG",
    "github": "GitHubLogoIcon",
    "google": "GoogleSVG",
    "hide": "EyeOff",
    "horizontalSliders": "SlidersHorizontal",
    "horizontalThreeDots": "MoreHorizontal",
    "laptop": "Laptop",
    "logout": "LogOut",
    "menu": "Menu",
    "message": "MessageSquare",
    "microsoft": "LayoutGrid",
    "moon": "Moon",
    "nextjs": "NextSVG",
    "Patreon": "PatreonSVG",
    "Paypal": "PaypalSVG",
    "placeholder": "Image",
    "product": "Package",
    "remove": "Minus",
    "reset": "RefreshCw",
    "search": "Search",
    "send": "Send",
    "settings": "Settings",
    "shoes": "Footprints",
    "spinner": "SpinnerSVG",
    "star": "Star",
    "store": "ShoppingBag",
    "sun": "SunMedium",
    "terminal": "FileTerminal",
    "trash": "Trash",
    "twitter": "X",
    "upload": "UploadCloud",
    "user": "User",
    "verticalSliders": "Sliders",
    "verticalThreeDots": "MoreVertical",
    "view": "Eye",
    "volume": "Volume2",
    "volumeMute": "VolumeX",
    "wallet": "Wallet",
    "warning": "AlertTriangle",
}

# Define the import paths
icon_import_paths = {
    "DiscordLogoIcon": "@radix-ui/react-icons",
    "GitHubLogoIcon": "@radix-ui/react-icons",
    # Add other paths as needed...
}

def get_import_statement(icon_name):
    """Generate the import statement for a given icon."""
    if icon_name in icon_import_paths:
        return f'import {{{icon_name}}} from "{icon_import_paths[icon_name]}";'
    return f'import {{{icon_name}}} from "lucide-react";'

# Define the source directory
src_dir = "src"

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8', newline='') as file:
        lines = file.readlines()

    # Check if the Icons import exists
    if any('import { Icons } from "~/components/Common/Icons";' in line for line in lines):
        imports_set = set()
        content_lines = []
        last_import_index = 0

        # Collect existing imports and remember the position of the last import
        for i, line in enumerate(lines):
            if line.startswith("import "):
                last_import_index = i
            match = re.search(r'Icons\.(\w+)', line)
            if match:
                icon_key = match.group(1)
                if icon_key in icon_mappings:
                    icon_name = icon_mappings[icon_key]
                    import_statement = get_import_statement(icon_name)
                    if import_statement not in imports_set:
                        imports_set.add(import_statement)
                        content_lines.append(line.replace(f'Icons.{icon_key}', icon_name))
                    else:
                        content_lines.append(line.replace(f'Icons.{icon_key}', icon_name))
            else:
                content_lines.append(line)

        # Add new imports after the last import
        new_imports = [f"{imp}\n" for imp in imports_set]
        final_lines = lines[:last_import_index + 1] + new_imports + content_lines[last_import_index + 1:]

        # Write the updated content back to the file, preserving line endings
        with open(file_path, 'w', encoding='utf-8', newline='') as file:
            file.writelines(final_lines)
        print(f"Updated {file_path}")

def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx'):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    process_directory(src_dir)
