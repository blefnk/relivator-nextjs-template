# ! 🔴 USE AT OWN RISK 🔴 ! IT IS NOT FINISHED YET AND NOT TESTED TOO MUCH !

# TODO: W.I.P. This Script is Not Finished Yet

import json
import os
import re

# Path to cspell.json file
cspell_file_path = "../../../../cspell.json"

# Path to project src directory
project_path = "../../../../src"


# Function to load words from cspell.json
def load_cspell_words(file_path):
    with open(file_path, "r") as file:
        data = json.load(file)
    return set(data.get("words", []))


# Function to search words in the project files
def search_words_in_project(project_path, words):
    unused_words = set(words)
    for root, dirs, files in os.walk(project_path):
        for file in files:
            if file.endswith((".js", ".jsx", ".ts", ".tsx")):
                file_path = os.path.join(root, file)
                with open(file_path, "r", encoding="utf-8") as f:
                    file_content = f.read()
                    for word in words:
                        if re.search(r"\b" + re.escape(word) + r"\b", file_content):
                            unused_words.discard(word)
    return unused_words


# Load words from cspell.json
cspell_words = load_cspell_words(cspell_file_path)

# Search for unused words in the project
unused_words = search_words_in_project(project_path, cspell_words)

# Output the unused words
print("Unused words:", unused_words)

# TODO: Remove unused words from cspell.json
