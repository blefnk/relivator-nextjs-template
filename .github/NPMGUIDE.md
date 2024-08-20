# The Detailed NPM Guide

<!--
For those viewing this markdown file using:
 – VSCode: Press F1 or Cmd/Ctrl+Shift+P and enter ">Markdown: Open Preview". Please install the "markdownlint" and "Markdown All in One" extensions.
 – GitHub: Does this .md file appear different from what you are used to seeing on GitHub? Ensure the URL does not end with "?plain=1".
-->

*This guide is designed to help beginners understand and use NPM effectively. It covers everything from basic setup to advanced tasks like publishing packages and managing versions.*

## Introduction to package managers

- [npm](https://npmjs.com) (Node Package Manager) is the default package manager for Node.js. It helps developers to install, manage, and share packages (modules) of JavaScript code. If you're building a project in Node.js or working with front-end frameworks like Next.js, you'll likely use NPM to handle your dependencies.

- [yarn](https://yarnpkg.com) is a package manager that doubles down as project manager. Whether you work on simple projects or industry monorepos, whether you're an open source developer or an enterprise user, Yarn has your back.

- [pnpm](https://pnpm.io) is a fast, disk space-efficient package manager for JavaScript. It is an alternative to NPM and Yarn, offering unique features like a non-flat node_modules structure and symlinked dependencies, making it faster and more reliable in handling large projects.

- [bun](https://bun.sh) is a fast npm-compatible JavaScript package manager. Develop, test, run, and bundle JavaScript & TypeScript projects—all with Bun. Bun is an all-in-one JavaScript runtime & toolkit designed for speed, complete with a bundler, test runner, and Node.js-compatible package manager.

## Installing Node.js and NPM

To get started with NPM, you need to install Node.js, which comes with NPM by default.

- **Windows/macOS:** Download and install from the [official Node.js website](https://nodejs.org).
- **Linux:** Follow the instructions in this [video](https://youtu.be/NS3aTgKztis) or install via your package manager.

After installation, you can check the versions of Node.js and NPM installed on your system:

```bash
node -v
npm -v
```

## Initializing a New Project

To start a new project using NPM, you need to create a `package.json` file, which holds metadata about your project and its dependencies.

```bash
npm init
```

Follow the prompts to set up your `package.json`. You can also use the `-y` flag to skip the prompts and use default values:

```bash
npm init -y
```

## Installing Packages

NPM makes it easy to install packages that you need for your project.

- **Installing a package locally (for your project):**

```bash
npm install <package_name>
```

This will add the package to your `node_modules` directory and list it as a dependency in your `package.json`.

- **Installing a package globally (available system-wide):**

```bash
npm install -g <package_name>
```

Global installations are useful for command-line tools that you want to access from anywhere on your system.

## Managing Dependencies

### Adding and Removing Packages

- **Add a package as a dependency:**

```bash
npm install <package_name>
```

- **Add a package as a development dependency:**

```bash
npm install <package_name> --save-dev
```

- **Remove a package:**

```bash
npm uninstall <package_name>
```

### Updating Packages

To update all packages to their latest versions based on the `semver` ranges specified in `package.json`, run:

```bash
npm update
```

If you want to update a specific package:

```bash
npm install <package_name>@latest
```

## Publishing a New Package

If you have created a package that you want to share with others, you can publish it to the NPM registry.

### Preparing Your Package

Ensure your `package.json` is correctly set up with necessary details like `name`, `version`, `description`, and `main`. Also, make sure you have a `.gitignore` file to avoid publishing unnecessary files.

### Logging into NPM

First, log in to your NPM account:

```bash
npm login
```

### Publishing Your Package

Once logged in, you can publish your package with:

```bash
npm publish
# If you want to have a @scope/* then use:
npm publish --access public
```

Your package will be available on [npmjs.com](https://npmjs.com) and can be installed by others using:

```bash
npm install <your_package_name>
```

## Releasing New Versions

When you make changes to your package, you'll need to release new versions. Follow the semantic versioning principles (`MAJOR.MINOR.PATCH`) to version your package appropriately.

- **Update the patch version (e.g., 1.0.0 -> 1.0.1):**

```bash
npm version patch
```

- **Update the minor version (e.g., 1.0.0 -> 1.1.0):**

```bash
npm version minor
```

- **Update the major version (e.g., 1.0.0 -> 2.0.0):**

```bash
npm version major
```

After updating the version, publish the new version:

```bash
npm publish
```

## Using `changeset` Tool for Version Management

[Changesets](https://github.com/changesets/changesets) is a tool that helps with versioning and publishing packages in a mono-repo or multi-package repository setup.

### Installing `changeset`

Install the changeset tool globally or as a dev dependency:

```bash
npm install @changesets/cli --save-dev
```

### Setting Up Changesets

Initialize changesets in your project:

```bash
npx changeset init
```

### Creating a Changeset

Whenever you make changes that need to be released, create a changeset:

```bash
npx changeset
```

Follow the prompts to describe the changes and bump versions.

### Releasing Changes

Once you're ready to release the changes:

- **1. Update versions**: Run the following command to bump versions and update changelogs.

  ```bash
  npx changeset version
  ```

- **2. Publish packages**: Finally, publish the updated packages:

  ```bash
  npx changeset publish
  ```

## Additional Resources

- [NPM Documentation](https://docs.npmjs.com)
- [Semantic Versioning](https://semver.org)
- [Creating and Publishing Unscoped Packages](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages)
- [Using Changesets with NPM](https://github.com/changesets/changesets)

---

This guide should give beginners a comprehensive introduction to NPM while also providing enough detail for more advanced users to manage and publish their packages effectively. You can continue to expand this guide with additional sections as needed.
