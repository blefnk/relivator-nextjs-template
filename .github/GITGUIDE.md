# The Detailed Git Guide

<!--
For those viewing this markdown file using:
 – VSCode: Press F1 or Cmd/Ctrl+Shift+P and enter ">Markdown: Open Preview". Please install the "markdownlint" and "Markdown All in One" extensions.
 – GitHub: Does this .md file appear different from what you are used to seeing on GitHub? Ensure the URL does not end with "?plain=1".
-->

*It is recommended to install Relivator following the detailed instructions in the [README.md](https://github.com/blefnk/relivator#readme) to feel more confident as you begin learning Git.*

It's true—[Git](https://git-scm.com) can be complex at first. Consider using resources like this guide, the [Git Book](https://git-scm.com/book), and [GitHub Skills](https://skills.github.com) to deepen your understanding. The command *git commit --help* will direct you to information about the `git commit` command and its options, so this help command can be beneficial as well. The best way to get comfortable with Git is to use it regularly. Create a small project or use a large web project template like [Relivator](https://github.com/blefnk/relivator-nextjs-template) and experiment with different commands. If you're ever unsure about something related to Git, refer to this detailed guide to learn more.

## Git Initial Setup

*By following the details in this guide, you will get a solid start with Git, set up your environment, and use some handy aliases to streamline your workflow. Happy gitting!*

### Essential Tools

Ensure you have [*Git*](https://learn.microsoft.com/en-us/devops/develop/git/install-and-set-up-git) installed. It's also recommended to install: *Node.js LTS* ([Windows/macOS](https://nodejs.org) | [Linux](https://youtu.be/NS3aTgKztis)). Then, run *corepack enable pnpm* to install [*pnpm*](https://pnpm.io/installation). Additionally, we recommend installing [*VSCode*](https://code.visualstudio.com) and *GitHub Desktop* ([Windows/macOS](https://desktop.github.com) | [Linux](https://dev.to/rahedmir/is-github-desktop-available-for-gnu-linux-4a69)). If you're a Windows user, also install [PowerShell 7.4+](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.4#installing-the-msi-package).

### Setting Up Your Identity

Before you start creating any commits in Git, you need to set your identity. This is important because your name and email will be added to every commit you make. Since this information is public, use something appropriate.

```bash
git config --global user.name "<YOUR_NAME>"
git config --global user.email "<YOUR_EMAIL_ADDRESS>"
```

### Checking Your Settings

To see all your Git settings and ensure they are correct, run:

```bash
git config --global --list
```

## Git References

Writing good commits is a valuable skill. To learn how to write effective commit messages, refer to the following resources:

- [Enhance Your Git Log with Conventional Commits](https://dev.to/maxpou/enhance-your-git-log-with-conventional-commits-3ea4)
- [Karma Commit Messages](http://karma-runner.github.io/6.4/dev/git-commit-msg.html)
- [Semantic Commit Messages](https://seesparkbox.com/foundry/semantic_commit_messages)
- [A Note About Git Commit Messages](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
- [Writing Git Commit Messages](https://365git.tumblr.com/post/3308646748/writing-git-commit-messages)

## Aliases

Git aliases are shortcuts for longer commands. They can save you a lot of typing and make your workflow more efficient.

### Receiving Updates

This alias updates your local repository by pulling the latest changes, rebasing, and updating submodules.

```bash
# git down
git config --global alias.down '!git pull --rebase --autostash; git submodule update --init --recursive'
```

### Sending Updates

This alias pushes your changes to the remote repository, including tags.

```bash
# git up
git config --global alias.up '!git push; git push --tags'
```

### Undo Staging of One or More Files

Sometimes you stage files by mistake. This alias helps you unstage them.

```bash
# git unstage <FILES>
git config --global alias.unstage 'reset HEAD --'
```

### Tagging Releases According to Semantic Versioning (SemVer)

Semantic Versioning is a way to tag your releases with meaningful version numbers. These aliases help automate the process.

```bash
# git release-major
git config --global alias.release-major '!latest=$(git describe --abbrev=0 --tags 2>/dev/null); latest=${latest:-v0.0.0}; set -- $(echo $latest | sed -e s/v// -e "s/\./ /g"); major=$1; minor=$2; patch=$3; major=$((major+1)); minor=0; patch=0; next=v$major.$minor.$patch; git tag -a $next -m ""; echo "Previous release:"; echo -n "  "; echo $latest; echo "New release:"; echo -n "  "; echo $next'

# git release-minor
git config --global alias.release-minor '!latest=$(git describe --abbrev=0 --tags 2>/dev/null); latest=${latest:-v0.0.0}; set -- $(echo $latest | sed -e s/v// -e "s/\./ /g"); major=$1; minor=$2; patch=$3; minor=$((minor+1)); patch=0; next=v$major.$minor.$patch; git tag -a $next -m ""; echo "Previous release:"; echo -n "  "; echo $latest; echo "New release:"; echo -n "  "; echo $next'

# git release-patch
git config --global alias.release-patch '!latest=$(git describe --abbrev=0 --tags 2>/dev/null); latest=${latest:-v0.0.0}; set -- $(echo $latest | sed -e s/v// -e "s/\./ /g"); major=$1; minor=$2; patch=$3; patch=$((patch+1)); next=v$major.$minor.$patch; git tag -a $next -m ""; echo "Previous release:"; echo -n "  "; echo $latest; echo "New release:"; echo -n "  "; echo $next'
```

### Ignoring Redundant `git` Binary Names in Commands

You can avoid typing `git git` by setting up an alias:

```bash
# git git status, git git commit, etc.
git config --global alias.git '!cd "$GIT_PREFIX" && git'
```

### Displaying Changelog Since Latest Tag

To see the changelog from the latest tag to your current commit, use this alias:

```bash
# git changelog
git config --global alias.changelog '!git log $(git describe --abbrev=0 --tags)..HEAD --no-merges --pretty=oneline --abbrev-commit'
```

### Detecting Remnants and Leftovers from Development

Find common leftover markers like TODOs or debug prints in your code:

```bash
# git leftover
git config --global alias.leftover '!git grep -P -i -I --untracked "((?<![a-zA-Z0-9])(TODO|FIXME|XXX|console\.log|System\.out|var_dump)(?![a-zA-Z0-9]))|([\t ]+$)"'
```

## Recommendation

### Using Your Favorite Editor for Git

You can set your favorite text editor to use with Git for writing commit messages, etc. For example, if you prefer `gedit` on Ubuntu:

```bash
git config --global core.editor "gedit --wait"
```

### Handling Line Endings Correctly on Windows

Windows and Unix-based systems (like Linux and macOS) handle line endings differently. To avoid issues, configure Git to automatically handle this for you. This will convert line endings to the native Windows format (CRLF) on checkout and back to Unix format (LF) when you push changes.

```bash
git config --global core.autocrlf true
```

### Remembering (Caching) Passwords for HTTPS

When you clone repositories over HTTPS, you need to enter a username and password each time, unlike SSH keys. To make Git remember your passwords and make your life easier, use the following commands based on your operating system:

```bash
# On Windows
git config --global credential.helper wincred

# On Ubuntu
sudo apt-get install libgnome-keyring-dev
cd /usr/share/doc/git/contrib/credential/gnome-keyring
sudo make
git config --global credential.helper /usr/share/doc/git/contrib/credential/gnome-keyring/git-credential-gnome-keyring

# On macOS
git config --global credential.helper osxkeychain
```

## Usage

### Update a Forked Repository (Sync with the Original)

1. **Add the original repository as a remote (do this only once):**

   ```bash
   git remote add upstream <GIT_URL_OF_ORIGINAL_REPOSITORY>
   ```

2. **Get updates from the original repository and push them to your fork:**

   ```bash
   git pull upstream <BRANCH_NAME>
   git push origin
   ```

### Reset a Repository to the Forked Repository's State

1. **Add the original repository as a remote (do this only once):**

   ```bash
   git remote add upstream <GIT_URL_OF_ORIGINAL_REPOSITORY>
   ```

2. **Reset your repository's state:**

   ```bash
   git remote update
   git reset --hard upstream/<BRANCH_NAME>
   git push origin +<BRANCH_NAME>
   ```

### Show All Ignored Files for a Repository

To list all ignored files:

```bash
git clean -ndX
# or
git status --ignored
```

### Get a List of All Remotes for a Repository

To see all remote repositories associated with your local repository:

```bash
git remote -v
```

### Remove All Newly Ignored Files

When you've added a file to `.gitignore` that was previously in the repository, remove it from the repository:

```bash
git rm -r --cached .
git add .
```

### Changing the URL of a Repository's Remote

To change the remote URL:

```bash
git remote set-url <REMOTE_NAME> <NEW_REMOTE_URL>
```

### Discard Unstaged Changes

To discard all unstaged changes:

```bash
git checkout -- .
```

To discard changes for a specific file or path:

```bash
git checkout -- "<PATH_TO_DISCARD_CHANGES_FOR>"
```

### Undo a Commit That Has Already Been Published

**Safe method:**

```bash
git checkout HEAD~1 .
git commit -m "Undo some commit"
git push <REMOTE_NAME> <BRANCH_NAME>
```

**Dangerous method:**

```bash
git reset --hard HEAD~1
git push -f <REMOTE_NAME> <BRANCH_NAME>
```

### Undo a Local Commit (Not Published Yet)

To keep the changes in your working copy:

```bash
git reset --soft HEAD~1
```

To discard the changes altogether:

```bash
git reset --hard HEAD~1
```

### Show Changes Made to the Working Copy

To show unstaged changes only:

```bash
git diff
```

To show staged changes only:

```bash
git diff --staged
```

To show both unstaged and staged changes:

```bash
git diff HEAD
```

### Delete a Branch

To delete a branch locally:

```bash
git branch -d <BRANCH_NAME>
```

To delete a branch on the remote:

```bash
git push <REMOTE_NAME> :<BRANCH_NAME>
```

### Adding a Description to a Commit

To add a commit message with both a title and a description:

```bash
git commit -m "<TITLE>" -m "<DESCRIPTION>"
```

### Remove All Untracked Files and Directories

To preview what will be deleted:

```bash
git clean -ndf
```

To actually delete the files:

```bash
git clean -df
```

### Show the Log in a Short Version

To display the commit log in a condensed format:

```bash
git log --pretty=oneline --abbrev-commit
```

### Create a Branch

To create a new branch but stay on the current branch:

```bash
git branch <NEW_BRANCH_NAME>
```

To create and switch to a new branch:

```bash
git checkout -b <NEW_BRANCH_NAME>
```

### Switch to Another Branch

To switch to another branch:

```bash
git checkout <OTHER_BRANCH_NAME>
```

### Tagging Releases

You can mark specific points in your repository's history by adding tags. Tags are commonly used for releases but can be used for other purposes as well.

To tag the current commit, use the following commands. Replace `<TAG_NAME>` with the unique name for the tag (e.g., `v1.0.4` for versioning) and `<DESCRIPTION>` with a description of the changes (optional).

```bash
git tag -a "<TAG_NAME>" -m "<DESCRIPTION>"
git push <REMOTE_NAME> --tags
```

### Importing Commits, Pull Requests, and Other Changes via Patch Files

1. Get the patch file for the commit, pull request, or change you want to import. For GitHub pull requests, you can get the patch file by appending `.patch` to the URL of the pull request:

   ```bash
   curl -L https://github.com/<USER>/<REPO>/pull/<ID>.patch
   ```

2. Apply the patch file using `git apply`:

   ```bash
   curl -L https://github.com/<USER>/<REPO>/pull/<ID>.patch | git apply
   ```

3. Optionally, make additional changes to the imported code.

4. Commit the changes, mentioning the original author of the patch:

   ```bash
   git commit --author "<ORIGINAL_AUTHOR_NAME> <<ORIGINAL_AUTHOR_EMAIL>>" -m "<YOUR_COMMIT_MESSAGE>"
   ```

### Copying a Branch

To create a local copy of an old branch under a new name and push it to the remote:

```bash
git checkout -b <NEW_BRANCH_NAME> <OLD_BRANCH_NAME>
git push -u <REMOTE_NAME> <NEW_BRANCH_NAME>
```

### Moving a Branch

To rename a branch locally and on the remote:

```bash
git checkout -b <NEW_BRANCH_NAME> <OLD_BRANCH_NAME>
git push -u <REMOTE_NAME> <NEW_BRANCH_NAME>
git branch -d <OLD_BRANCH_NAME>
git push origin :<OLD_BRANCH_NAME>
```

### Clearing a Branch and Resetting it to an Empty State

To create a new branch with no history and start fresh:

```bash
git checkout --orphan <NEW_BRANCH_NAME>
rm -rf ./*
# Add your new files
git add .
git commit -m "Initial commit"
git push -uf <REMOTE_NAME> <NEW_BRANCH_NAME>
```

### Counting Commits on a Branch

To count the total number of commits on a branch:

```bash
git rev-list --count <BRANCH_NAME>
# Example: git rev-list --count main
```

To count commits per author:

```bash
git shortlog -s -n
```

## Undoing Changes

### Undo Git Reset

If you mistakenly ran `git reset --hard HEAD^` and lost commits, use `git reflog` to find the commit and reset to it:

```bash
git reflog
git reset 'HEAD@{1}'
```

### Undo Last Commit

To undo the last commit but keep the changes in your working directory:

```bash
git reset --soft HEAD~1
```

### Finding Folder Size

To find the size of a folder:

```bash
du -hs
```

### Clearing Git History

To remove files from history, use `git filter-branch`:

```bash
git filter-branch --index-filter 'git rm --cached --ignore-unmatch <pathname>' <commitHASH>
```

Or use `bfg`:

1. Install `bfg`:

   ```bash
   brew install bfg
   ```

2. Run `bfg` to clean commit history:

   ```bash
   bfg --delete-files *.mp4
   bfg --replace-text passwords.txt
   bfg --delete-folders .git
   ```

3. Remove files:

   ```bash
   git reflog expire --expire=now --all && git gc --prune=now --aggressive
   ```

To replace text, create a `passwords.txt` file with the following format:

```plaintext
PASSWORD1 # Replace literal string 'PASSWORD1' with '***REMOVED***' (default)
PASSWORD2==>examplePass         # Replace with 'examplePass' instead
PASSWORD3==>                    # Replace with the empty string
regex:password=\w+==>password=  # Replace using a regex
```

### Squash Commits

To combine multiple commits into one:

```bash
git rebase -i HEAD~<n>
# or
git rebase -i <COMMIT_HASH>
```

### Undo Your Changes

To discard all changes:

```bash
git reset
git checkout .
git clean -fdx
```

### Remove `node_modules` if Accidentally Checked In

```bash
git rm -r --cached node_modules
```

### Amend Your Commit Messages

To change the commit message of the most recent commit:

```bash
git commit --amend
```

### Cherry-Picking

To apply a commit from another branch as a new commit:

```bash
git cherry-pick <YOUR_COMMIT_HASH>
```

## Branch Management

### Rename a Branch

To rename a branch, you can use the following commands:

```bash
# Rename the branch from old-name to new-name
git branch -m old-name new-name
# Or, if you are on the branch you want to rename
git branch -m new-name

# Delete the old branch on the remote and push the new branch
git push origin :old-name new-name

# Set the upstream branch for the new branch
git push origin -u new-name
```

### Reset Local Repository Branch to Match Remote

To reset your local branch to match the remote repository's `main` branch:

```bash
git fetch origin
git reset --hard origin/main
git clean -f # Clean local files
```

### Delete All Merged Remote Branches

To delete all remote branches that have already been merged:

```bash
git branch -r --merged | grep -v main | sed 's/origin\///' | xargs -n 1 git push --delete origin
```

### Reset to Origin

To reset your local branch to match the remote:

```bash
git fetch --all

# Option 1: Reset to main branch
git reset --hard origin/main

# Option 2: Reset to a specific branch
git reset --hard origin/<branch_name>
```

### Get Latest Commit of Repository

To get the latest commit of the repository:

```bash
git log -1
```

Press `Q` to exit the log view.

### Get Hash from Latest Commit

To get the full hash of the latest commit:

```bash
git log -1 --pretty=%H
# Output
706b92ba174729c6a1d761a8566a74f0a0bf8672
```

To get the abbreviated hash:

```bash
git log -1 --pretty=%h
# Output
706b92b
```

To store the hash in a variable:

```bash
echo $(git log -1 --pretty=%H)
```

### Tagging for Docker Versioning

Tag the repository and perform a commit:

```bash
# Tag the repository
git tag -a v0.0.1 -m "version v0.0.1"

# Check the tag
git describe
# Output: v0.0.1

# Perform a commit
git commit -am 'chore: do something'

# Describe again
git describe
# Output: v0.0.1-1-g9ba5c76
```

### Git Shortcuts

Set up aliases to simplify common Git commands:

```bash
alias gst='git status'
alias gcm='git commit -S -am'
alias gco='git checkout'
alias gl='git pull origin'
alias gpom="git pull origin main"
alias gp='git push origin'
alias gd='git diff | mate'
alias gb='git branch'
alias gba='git branch -a'
alias del='git branch -d'
```

### Getting the GitHub Repository Name and Owner

To get the repository URL and name:

```bash
git config --get remote.origin.url
git ls-remote --get-url
git remote get-url origin
# Output: https://github.com/username/repository.git

basename $(git remote get-url origin) .git
# Output: repository
```

### Delete Branch Locally

To delete a branch locally:

```bash
git push origin --delete <branch_name>
```

### Clear Local Deleted Branches and Fetch All Other Branches

```bash
git remote update --prune
```

### Remove All Local Branches Except the Current One

```bash
git branch | grep -v "main" | xargs git branch -D
```

### Sort Branches by Last Commit Date

To list branches sorted by the last commit date:

```bash
git fetch --prune
git branch --sort=-committerdate
```

## Commit Management

### Git Commit Messages

- **feat**: A new feature visible to end users.
- **fix**: A bug fix visible to end users.
- **chore**: Changes that don't impact end users (e.g., changes to CI pipeline).
- **docs**: Changes to documentation.
- **refactor**: Changes to production code focused on readability, style, or performance.

### List Branches that Have Been Merged

```bash
git branch --merged
```

### List Branches that Have Not Been Merged

```bash
git branch --no-merged
```

### Cleanup and Optimize Repository

To clean up unnecessary files and optimize the local repository:

```bash
# Cleanup unnecessary files
git gc

# Prune all unreachable objects from the object database
git prune

# Verify the connectivity and validity of objects in the database
git fsck

# Prune your remote working directory
git remote update --prune
```

### Push Commits with Tags Automatically

```bash
git config --global push.followTags true
```

### Restore a File to a Given Commit

To restore a specific file to its state at a given commit:

```bash
git restore -s <SHA1> -- <filename>
```

## Useful Git Commands and Techniques

### Download Just a Folder from GitHub with Subversion (SVN)

To download a specific folder from a GitHub repository using SVN:

```bash
# Replace tree/main with trunk in the URL
svn export https://github.com/alextanhongpin/pkg.git/trunk/authheader
```

To create an alias for downloading `docker-compose` templates:

```bash
alias init-db='svn export https://github.com/alextanhongpin/docker-samples/trunk/postgres/docker-compose.yml'
```

### Pre-Commit Hooks

Ensure you have a changelog edited in your current branch. Use a pre-commit hook to enforce this:

```bash
#!/bin/bash

if [[ $(git diff develop -- CHANGELOG.md | wc -l) -eq 0 ]]; then
  echo "Don't forget to add CHANGELOG.md"
  exit 1
fi
```

### Git Rebase Favor Current Branch

To favor the current branch during a rebase:

```bash
git rebase -X theirs ${branch}
```

[More info on merge strategies for rebase](https://stackoverflow.com/questions/2945344/how-do-i-select-a-merge-strategy-for-a-git-rebase)

### Git Post-Checkout Hook

To automate tasks after checking out a branch, use a post-checkout hook:

1. Create and set permissions for the hook:

   ```bash
   touch .git/hooks/post-checkout
   chmod u+x .git/hooks/post-checkout
   ```

2. Add the following script to `.git/hooks/post-checkout`:

   ```bash
   #!/bin/bash

   # Parameters
   # $1: Ref of previous head
   # $2: Ref of new head
   # $3: Whether this is a file checkout (0) or branch checkout (1).

   # This is a file checkout - do nothing
   if [ "$3" == "0" ]; then exit; fi

   BRANCH_NAME=$(git symbolic-ref --short -- HEAD)
   NUM_CHECKOUTS=$(git reflog --date=local | grep -o ${BRANCH_NAME} | wc -l)

   # If the refs of the previous and new heads are the same
   # and the number of checkouts equals one, a new branch has been created
   if [ "$1" == "$2" ] && [ ${NUM_CHECKOUTS} -eq 1 ]; then
     echo "new branch created"
   else
     echo "switched branch to ${BRANCH_NAME}"
   fi
   ```

### Git Checkout a Single File from Main Commit

To revert a file to its state in the main branch:

```bash
git checkout $(git rev-parse main) -- path-to-file
```

### Adding New Changes to the Latest Commit

To amend the latest commit with new changes:

```bash
git add --all
git commit --amend
# Note: You may need to force push if the commit has already been pushed
git push --force
```

### Cleaning a Branch PR

If your branch is messy and you want to clean up the commits:

1. Create a new temporary branch:

   ```bash
   git checkout -b feature/foo-tmp
   ```

2. Create a patch file of changes:

   ```bash
   git diff origin/feature/foo origin/main > out.patch
   ```

3. Apply the patch to the temporary branch:

   ```bash
   git apply out.patch
   ```

4. Clean up and rebase as needed, then delete the old branch:

   ```bash
   git branch -D feature/foo
   ```

5. Rename the temporary branch to the original name:

   ```bash
   git branch -m feature/foo
   ```

6. Force push the cleaned branch:

   ```bash
   git push --force feature/foo
   ```

### Better Push Force

Use `git push --force-with-lease` instead of `git push --force` for safer forced updates.

[Learn more about force-with-lease](https://stackoverflow.com/questions/52823692/git-push-force-with-lease-vs-force)

### Git Fixup

To fix up a previous commit:

1. Create a fixup commit:

   ```bash
   git commit --fixup <first-commit-hash>
   ```

2. Rebase to squash the fixup commit:

   ```bash
   git rebase -i --autosquash --root
   ```

## Resources

- [Relivator Next.js Template](https://github.com/blefnk/relivator#readme)
- [Theo's Post](https://youtube.com/post/UgkxE4zRFagfPNviZN2OgYMhozOa7MJSbktM)
- [Martin Heinz's Blog](https://martinheinz.dev/blog/109)
- [Delight-IM's Git Knowledge](https://github.com/delight-im/Knowledge/blob/master/Git.md)
- [Alex Tan Hong Pin's Cheat Sheet](https://github.com/alextanhongpin/cheat-sheet/blob/master/git.md)

## The Bottom Line

*This guide covers various useful Git commands and techniques, inspired by various resources and composed by Reliverse, making it easier for both beginners and advanced users to manage and optimize their repositories.*
