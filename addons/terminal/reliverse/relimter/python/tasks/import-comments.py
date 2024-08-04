# ! 🔴 USE AT OWN RISK 🔴 ! IT IS NOT FINISHED YET AND NOT TESTED TOO MUCH !

import os


def process_file(filepath):
    try:
        with open(filepath, "r", encoding="utf-8") as file:
            lines = file.readlines()

        import_comments = []
        other_lines = []

        for line in lines:
            if line.strip().startswith("// import"):
                import_comments.append(line)
            else:
                other_lines.append(line)

        # Combine import comments and other lines, ensuring a blank line after import comments if they exist
        if import_comments:
            new_content = "".join(import_comments) + "\n" + "".join(other_lines)
        else:
            new_content = "".join(other_lines)

        with open(filepath, "w", encoding="utf-8") as file:
            file.write(new_content)

    except Exception as e:
        print(f"Error processing file {filepath}: {e}")


def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".ts") or file.endswith(".tsx"):
                process_file(os.path.join(root, file))


if __name__ == "__main__":
    directory = "../.."  # The path to the directory
    process_directory(directory)
