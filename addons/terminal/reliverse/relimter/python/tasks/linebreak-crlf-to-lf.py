# ! 🔴 USE AT OWN RISK 🔴 ! IT IS NOT FINISHED YET AND NOT TESTED TOO MUCH !

# Script to search for disabled ESLint plugin rules
# Created by Nazar Kornienko https://github.com/blefnk
# To use run `py src/tools/unstable/linebreak-crlf-to-lf.py` !!! FROM THE ROOT

import os


def convert_crlf_to_lf(file_path):
    """Convert CRLF line endings to LF."""
    with open(file_path, "rb") as file:
        content = file.read()

    # Convert CRLF to LF
    new_content = content.replace(b"\r\n", b"\n")

    with open(file_path, "wb") as file:
        file.write(new_content)
    print(f"Converted CRLF to LF in {file_path}")


def process_directory(directory):
    """Process all files in the directory to convert CRLF to LF."""
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            convert_crlf_to_lf(file_path)


if __name__ == "__main__":
    directory = "src"  # input("Enter the directory path: ")
    process_directory(directory)
    print("Conversion complete.")
