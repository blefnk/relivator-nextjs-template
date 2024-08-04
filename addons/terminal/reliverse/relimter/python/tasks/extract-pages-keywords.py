# 🐞 UNFINISHED AND DOESN'T WORK AS EXPECTED. Please make commit before usage.
# PYTHON SCRIPT TODO: The script reads all page.tsx files in the src folder, searches for `export const metadata: Metadata = {}` (if not found, creates it above `export default function`), analyzes the content from the `return()` statement or the default function component, uses a dictionary library to predict the main keywords of the page, and writes the title, description, and keywords to the metadata.
# py addons\reliverse\relimter\python\tasks\extract-pages-keywords.py

import os
import re
from collections import Counter
from string import punctuation

# Path to the src folder
src_folder = "src/app/[locale]"


def extract_keywords(text, num_keywords=5):
    # Remove HTML tags and split text into words
    text = re.sub(r"<[^>]+>", "", text)
    words = re.findall(r"\b\w+\b", text.lower())

    # Remove common stopwords and punctuation
    stopwords = set(
        [
            "the",
            "and",
            "is",
            "in",
            "to",
            "of",
            "a",
            "for",
            "on",
            "with",
            "as",
            "by",
            "an",
            "at",
            "from",
            "it",
            "or",
            "that",
            "this",
            "be",
            "which",
        ]
    )
    words = [
        word for word in words if word not in stopwords and word not in punctuation
    ]

    # Get the most common words
    most_common = Counter(words).most_common(num_keywords)
    return ", ".join([word for word, _ in most_common])


def process_file(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()

    # Extract content from return() or default function
    function_content_match = re.search(r"return\s*\((.*?)\)", content, re.DOTALL)
    if not function_content_match:
        function_content_match = re.search(
            r"export default function\s*\(.*?\)\s*{(.*?)}", content, re.DOTALL
        )

    if not function_content_match:
        print(f"No content found in {file_path}")
        return

    function_content = function_content_match.group(1)

    # Extract keywords, title, and description
    keywords = extract_keywords(function_content)
    title_match = re.search(r"<h1[^>]*>(.*?)</h1>", function_content)
    title = title_match.group(1) if title_match else "Page"
    description_match = re.search(r"<p[^>]*>(.*?)</p>", function_content)
    description = (
        description_match.group(1) if description_match else "Page description"
    )

    metadata = f"""
export const metadata: Metadata = {{
  description: "{description.strip()}",
  title: "{title.strip()}",
  keywords: "{keywords}",
}};
"""

    # Insert or replace metadata
    if "export const metadata: Metadata =" in content:
        content = re.sub(
            r"export const metadata: Metadata = \{.*?\};",
            metadata,
            content,
            flags=re.DOTALL,
        )
    else:
        content = re.sub(r"(export default function)", metadata + r"\n\n\1", content)

    # Write the updated content back to the file
    with open(file_path, "w", encoding="utf-8") as file:
        file.write(content)
    print(f"Processed {file_path}")


# Iterate over all .tsx files in the src folder
for root, _, files in os.walk(src_folder):
    for file in files:
        if file.endswith("page.tsx"):
            process_file(os.path.join(root, file))
