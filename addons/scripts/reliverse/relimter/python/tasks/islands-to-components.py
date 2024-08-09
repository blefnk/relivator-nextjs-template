# !! 🔴 USE THIS SCRIPT AT YOUR OWN RISK UNTIL WE FINISH WORKING ON IT 🏹🦵

import os
import re
import shutil

"""src/tools/unstable/codemods-reliverse/components-to-components.py

!! 🐞 This UNTESTED TOO MUCH codemod does the following:
1. Reads all .ts and .tsx files in the src directory.
2. Looks for ES imports and updates paths.
3. Saves the original and updated paths to a text file.
4. Updates the import paths in the files.
5. Executes the main script to move and rename files and folders.
6. Files will be renamed from kebab-case to PascalCase.
7. Each file will be moved to a new folder with the same name (barrel pattern).
8. The new folder will contain an index.tsx file that exports the component.
9. Updates index.ts files to export components.

# By the way: using the barrel pattern is totally okay for Next.js thanks to tree-shaking optimization.
# But if external lib uses so much barrel pattern, specify it in next.config.js in optimizePackageImports.
# @see https://vercel.com/blog/how-we-optimized-package-imports-in-next-js
# @see https://github.com/vercel/next.js/pull/56489
"""


# Helper function to convert kebab-case to PascalCase
def kebab_to_pascal(name):
    return "".join(word.capitalize() for word in name.split("-"))


# Pattern for import paths
import_path_pattern = r'import\s+{[^}]+}\s+from\s+["\']([^"\']+)["\'];'


# Function to read all ts and tsx files and update import paths
def update_import_paths(src_directory, mapping_file):
    # Regular expression to find import statements
    import_pattern = re.compile(import_path_pattern)

    # List to store original and updated paths
    paths = []

    for root, _, files in os.walk(src_directory):
        for file in files:
            if file.endswith(".ts") or file.endswith(".tsx"):
                file_path = os.path.join(root, file)
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()

                # Find all import statements
                imports = import_pattern.findall(content)

                updated_content = content
                for imp in imports:
                    if "~/components/" in imp:
                        original_path = imp
                        new_path = imp.replace("~/", "~/components/").replace(
                            "/components/", "/"
                        )
                        new_path_parts = new_path.split("/components/")[1].split("/")
                        new_path_parts = [
                            kebab_to_pascal(part) for part in new_path_parts
                        ]
                        new_path = "~/components/" + "/".join(new_path_parts)
                        paths.append((original_path, new_path))
                        updated_content = updated_content.replace(
                            original_path, new_path
                        )
                    elif "src/components/" in imp:
                        original_path = imp
                        new_path = imp.replace("src/components/", "~/components/")
                        new_path_parts = new_path.split("/components/")[1].split("/")
                        new_path_parts = [
                            kebab_to_pascal(part) for part in new_path_parts
                        ]
                        new_path = "~/components/" + "/".join(new_path_parts)
                        paths.append((original_path, new_path))
                        updated_content = updated_content.replace(
                            original_path, new_path
                        )

                # Write updated content back to the file
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(updated_content)

    # Save original and updated paths to the mapping file
    with open(mapping_file, "w", encoding="utf-8") as f:
        for original_path, new_path in paths:
            f.write(f"{original_path} -> {new_path}\n")


def rename_and_move_files(src_folder, dst_folder):
    os.makedirs(dst_folder, exist_ok=True)

    # First rename files and folders
    for root, dirs, files in os.walk(src_folder, topdown=False):
        for name in files:
            if name.endswith(".tsx"):
                src_path = os.path.join(root, name)
                base_name = os.path.splitext(name)[0]
                pascal_case_name = kebab_to_pascal(base_name)
                new_name = pascal_case_name + ".tsx"
                new_path = os.path.join(root, new_name)
                if src_path != new_path:
                    os.rename(src_path, new_path)
                    print(f"Renamed {src_path} to {new_path}")

        for name in dirs:
            if name == "ui" and "src/components/primitives" in os.path.join(root, name):
                continue
            src_path = os.path.join(root, name)
            pascal_case_name = kebab_to_pascal(name)
            new_path = os.path.join(os.path.dirname(src_path), pascal_case_name)
            if src_path != new_path and not os.path.exists(new_path):
                os.rename(src_path, new_path)
                print(f"Renamed {src_path} to {new_path}")

    # Then move files and folders
    for root, dirs, files in os.walk(src_folder, topdown=False):
        for name in files:
            if name.endswith(".tsx"):
                src_path = os.path.join(root, name)
                relative_path = os.path.relpath(src_path, src_folder)
                new_folder_path = os.path.join(
                    dst_folder, os.path.dirname(relative_path)
                )
                os.makedirs(new_folder_path, exist_ok=True)

                new_file_path = os.path.join(new_folder_path, name)
                if os.path.exists(new_file_path):
                    print(f"File {new_file_path} already exists, not moved.")
                    continue
                shutil.move(src_path, new_file_path)
                print(f"Moved {src_path} to {new_file_path}")

                # Create an index.tsx file that exports the component
                index_tsx_path = os.path.join(new_folder_path, "index.tsx")
                pascal_case_name = os.path.splitext(name)[0]
                export_statement = f"export * from './{pascal_case_name}';\n"
                with open(index_tsx_path, "a", encoding="utf-8") as index_tsx:
                    index_tsx.write(export_statement)
                    print(
                        f"Updated {index_tsx_path} with export statement for {pascal_case_name}"
                    )

        for name in dirs:
            src_path = os.path.join(root, name)
            relative_path = os.path.relpath(src_path, src_folder)
            new_folder_path = os.path.join(dst_folder, relative_path)
            if os.path.exists(new_folder_path):
                print(f"Folder {new_folder_path} already exists, not moved.")
                continue
            shutil.move(src_path, new_folder_path)
            print(f"Moved folder {src_path} to {new_folder_path}")


def main():
    src_folder = "src/components"
    components_folder = "src/components"
    mapping_file = "path_mapping.txt"

    update_import_paths("src", mapping_file)
    rename_and_move_files(src_folder, components_folder)


if __name__ == "__main__":
    main()
