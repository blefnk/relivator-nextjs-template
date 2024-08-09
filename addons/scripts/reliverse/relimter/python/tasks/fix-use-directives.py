# ! 🔴 USE AT OWN RISK 🔴 ! IT IS NOT FINISHED YET AND NOT TESTED TOO MUCH !

import os


def process_file(filepath):
    with open(filepath, "r", encoding="utf-8") as file:
        content = file.readlines()

    # Check for 'use client' and 'use server' directives
    use_client = '"use client";'
    # use_server = '"use server";' # todo: fix inner "use server"
    client_index = -1
    # server_index = -1

    for i, line in enumerate(content):
        if use_client in line:
            client_index = i
        # if use_server in line:
        #     server_index = i

    has_changes = False

    # Move 'use client' to the first line if found
    if client_index > 0:
        content.insert(0, content.pop(client_index).strip() + "\n")
        has_changes = True

    # Adjust server_index if 'use client' was moved to the first line
    # if server_index > 0:
    #     if client_index < server_index:
    #         server_index -= 1
    #     content.insert(0, content.pop(server_index).strip() + '\n')
    #     has_changes = True

    if has_changes:
        with open(filepath, "w", encoding="utf-8") as file:
            file.writelines(content)
        print(f"Updated: {filepath}")


def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".ts") or file.endswith(".tsx"):
                process_file(os.path.join(root, file))


if __name__ == "__main__":
    src_directory = "src"  # Path to the src directory
    process_directory(src_directory)
