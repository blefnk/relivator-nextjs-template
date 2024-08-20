# Contributing Guidelines for Our Documentation

<!--
For those who are viewing the current markdown file using:
 – VSCode: Press F1 or Cmd/Ctrl+Shift+P and enter ">Markdown: Open Preview". Please install the "markdownlint" and "Markdown All in One" extensions.
 – GitHub: Does this .md file appear different from what you are used to seeing on GitHub? Ensure the URL does not end with "?plain=1".
-->

[📖 Docs](https://reliverse.org)

Are you fluent in a language other than English? Your expertise is invaluable to us!

We utilize [README.md](../README.md) for the current repo and the [Starlight](https://starlight.astro.build) for our shared documentation website. This fantastic tool enables multilingual support within the same repository. This means you can contribute to the documentation in the preferred language without the hassle of managing a separate repository. For detailed guidance, please explore the [Starlight i18n documentation](https://starlight.astro.build/guides/i18n/).

## How to Contribute

It's important to start by reading our [contribution guidelines](./CONTRIBUTING.md), which provide essential information about contributing to this project.

### Starting a New Translation

If our documentation isn't yet available in the language and you're interested in translating it, here's how you can start:

1. **Identify or Create a Translation Issue:**

   - Search for an existing issue for the language you wish to translate. If there isn't one, feel free to create it. This helps prevent duplicate efforts and enables the community to monitor translation progress.
   - If you find an existing issue, please comment to inform others that you are starting the translation. We advise submitting individual pull requests (PRs) for each document to simplify the review process.

2. **Configure Internationalization (i18n):**

   - Ensure that the i18n configuration is set up in Starlight. If not, set it up and submit a PR for this initial step. For instructions, visit ["Configure i18n"](https://starlight.astro.build/guides/i18n/#configure-i18n).

3. **Initiate Translation Process:**

   - Copy the files/folders you intend to translate from the `src/content/docs` directory to a new or existing directory named after the language (for instance, `src/content/docs/de` for German). Exclude any already translated code. Starlight will automatically default to English for untranslated documents. Unsure about the language code? Find it [here](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).

4. **Translate and Create PRs:**
   - Translate the copied files and submit a PR or Draft PR for each. Once completed, mark the PR as ready for review.

### Helpful Tips

- Sidebar translations are configured in `astro.config.ts`.
- Once you've completed the translations, please mark the pull request as ready for review.

### Review Process

Our goal is to have each PR reviewed by 1-2 people. This ensures high-quality documentation with a consistent tone.

If you know someone proficient in the translation language, encouraging them to review the PR can expedite the process. Their expertise will not only enhance the quality of the translation but also speed up the integration of the valuable contribution.

## Acknowledgements

This document draws inspiration from the translation guidelines of [t3-oss/create-t3-app](https://github.com/t3-oss/create-t3-app/blob/main/www/TRANSLATIONS.md) and [biomejs/biome](https://github.com/biomejs/biome/blob/main/website/TRANSLATIONS.md). We thank these communities for their pioneering efforts in collaborative translation.
