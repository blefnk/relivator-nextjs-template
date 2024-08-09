# 🐞 NOT FINISHED 🔥 USE AT OWN RISK

import os
import re
import glob

def replace_tags(content):
    # Replacing <p> with <Paragraph>
    content, p_replaced = re.subn(r'<p([^>]*)>', r'<Paragraph\1>', content)
    content, _ = re.subn(r'</p>', r'</Paragraph>', content)

    # Replacing <span> with <Span>
    content, span_replaced = re.subn(r'<span([^>]*)>', r'<Span\1>', content)
    content, _ = re.subn(r'</span>', r'</Span>', content)

    # Replacing <h1> to <h4> with <Heading as="h1"> to <Heading as="h4">
    h_replaced = False
    for i in range(1, 5):
        content, h_replaced_tmp = re.subn(f'<h{i}([^>]*)>', f'<Heading as="h{i}"\\1>', content)
        content, _ = re.subn(f'</h{i}>', '</Heading>', content)
        h_replaced = h_replaced or h_replaced_tmp > 0

    # Replacing <Link> with <Link>
    content, link_replaced = re.subn(r'<Link([^>]*)>', r'<Link\1>', content)
    content, _ = re.subn(r'</Link>', r'</Link>', content)

    # Replacing <a> with <Link>
    content, a_replaced = re.subn(r'<a([^>]*)>', r'<Link\1>', content)
    content, _ = re.subn(r'</a>', r'</Link>', content)

    # Replacing <header> with <Header>
    content, header_replaced = re.subn(r'<header([^>]*)>', r'<Header\1>', content)
    content, _ = re.subn(r'</header>', r'</Header>', content)

    # Replacing <footer> with <Footer>
    content, footer_replaced = re.subn(r'<footer([^>]*)>', r'<Footer\1>', content)
    content, _ = re.subn(r'</footer>', r'</Footer>', content)

    replacements_made = p_replaced > 0 or span_replaced > 0 or h_replaced or link_replaced > 0 or a_replaced > 0 or header_replaced > 0 or footer_replaced > 0

    return content, replacements_made

def add_imports(content):
    imports = {
        'Paragraph': 'import { Paragraph } from "@/components/ui/paragraph";',
        'Span': 'import { Span } from "@/components/ui/span";',
        'Heading': 'import { Heading } from "@/components/ui/heading";',
        'Link': 'import { Link } from "@/components/ui/link";',
        'Header': 'import { Header } from "@/components/ui/header";',
        'Footer': 'import { Footer } from "@/components/ui/footer";'
    }

    new_imports = []
    for component, import_statement in imports.items():
        if component in content and import_statement not in content:
            new_imports.append(import_statement)

    if new_imports:
        import_section = '\n'.join(new_imports) + '\n'
        if 'import ' in content:
            content = re.sub(r'(import [^\n]+;[\n]*)', r'\1' + import_section, content, count=1)
        else:
            content = import_section + content

    return content

def process_files(root_folder):
    # Glob pattern to find .tsx files
    pattern = os.path.join(root_folder, '**', '*.tsx')
    files = glob.glob(pattern, recursive=True)

    for file_path in files:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()

        updated_content, replacements_made = replace_tags(content)

        if replacements_made:
            updated_content = add_imports(updated_content)
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(updated_content)

if __name__ == "__main__":
    # Process the src and addons folders
    for folder in ['src', 'addons']:
        process_files(folder)
    print("Tag replacement and import addition completed.")
