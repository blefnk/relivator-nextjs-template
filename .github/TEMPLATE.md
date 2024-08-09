Here's the corrected version of your text:

# Add Your Commit Title Here

<!--
For those who are viewing the current markdown file using:
 – VSCode: Press F1 or Cmd/Ctrl+Shift+P and enter ">Markdown: Open Preview". Please install the "markdownlint" and "Markdown All in One" extensions.
 – GitHub: Does this .md file appear different from what you are used to seeing on GitHub? Ensure the URL does not end with "?plain=1".
-->

*This is the current repository's starting point for `git commit` messages. Feel free to edit this template to suit your needs. For more information about `git commit` messages, visit: [Git Commit Message Guidelines](https://github.com/joelparkerhenderson/git_commit_message)*

## Relevant Links

Reference links to relevant web pages, issue trackers, blog articles, etc. Examples:

- See: <https://example.com>
- See: [Example Page](https://example.com)

## Co-Authors

List all co-authors to ensure proper credit. Examples:

- Co-authored-by: Name <name@example.com>
- Co-authored-by: Name <name@example.com>

## Why

Describe the reason for this change. What are the goals, use cases, or stories behind it?

## How

Explain the implementation details. What algorithms, methods, or steps were used?

## Tags

Suitable tags for searching, such as hashtags or keywords. Examples:

- Tags:

## Help

### Subject Line Guidelines

Use imperative, uppercase verbs for the subject line:

- **Add**: Create a capability (e.g., feature, test, dependency).
- **Drop**: Delete a capability (e.g., feature, test, dependency).
- **Fix**: Fix an issue (e.g., bug, typo, accident, misstatement).
- **Bump**: Increase the version of something (e.g., a dependency).
- **Make**: Change the build process, tools, or infrastructure.
- **Start**: Begin doing something (e.g., enable a toggle, feature flag, etc.).
- **Stop**: End doing something (e.g., disable a toggle, feature flag, etc.).
- **Optimize**: A change that improves performance (e.g., speed up code).
- **Document**: A change that affects only documentation (e.g., help files).
- **Refactor**: A change that is purely refactoring.
- **Reformat**: A change that is purely formatting (e.g., indent lines, trim spaces).
- **Rephrase**: A change that is purely textual (e.g., edit a comment, doc, etc.).

### Subject Line Rules

- Use 50 characters maximum.
- Do not end with a period.

### Body Text Rules

- Use as many lines as necessary.
- Wrap lines at 72 characters maximum.

## Usage

To use this template, place the file here:

```plaintext
~/.git_commit_template.txt
```

Configure git to use the template:

```bash
git config --global commit.template ~/.git_commit_template.txt
```

Add the following to your `~/.gitconfig` file:

```plaintext
[commit]
  template = ~/.git_commit_template.txt
```

Adjust the file location and usage as needed.

## Tracking

- Package: GITCOMMIT.md
- Version: 1.0.0
- Updated: 2024-07-20T22:15:57Z
- License: MIT
- Contact: Nazar Kornienko (<blefnk@gmail.com>)
