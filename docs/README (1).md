Back to the [main guide](../../README.md).

# CSIT340 Git Command Cheat Sheet

Use Command Prompt or Git Bash, not PowerShell. Run every command inside your project folder unless a step says otherwise. Anything in `<angle brackets>` is a placeholder: replace it, including the brackets.

## 1. One-time setup (per computer)

Git stamps every commit with a name and email. Set them once. Use the email on your GitHub account.

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
```

Check what is saved:

```bash
git config --global --list
```

## 2. Start a NEW project and push it to GitHub

Before the commands: on github.com click **New repository**, type the exact repository name from your assignment, and leave README, `.gitignore`, and license unticked. An empty repository avoids merge problems later. Copy the HTTPS URL it shows you.

```bash
cd C:\csit340\<project-folder>
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

| Command | What it does |
| --- | --- |
| `git init` | Turns the current folder into a Git repository (creates a hidden `.git` folder) |
| `git add .` | Stages every changed file for the next commit. The dot means "everything here". |
| `git commit -m "..."` | Saves a snapshot of the staged files with a message |
| `git branch -M main` | Renames your current branch to main (GitHub's default) |
| `git remote add origin <url>` | Links your folder to the GitHub repository. `origin` is just the nickname. |
| `git push -u origin main` | Uploads main to GitHub. `-u` remembers it, so later you only type `git push`. |

**Notes**

- A Vite project already has a `.gitignore` that skips `node_modules` and `dist`. Do not upload `node_modules`.
- The first push opens a browser sign-in window (Git Credential Manager). If it asks for a password in the terminal, GitHub no longer accepts your account password there. Create a personal access token in GitHub settings, then Developer settings, and paste that instead.
- Run `git status` before committing if you are unsure what will be included.

## 3. CLONE an existing repository

Use this to download a repo someone else (or you, on another computer) already put on GitHub. You do not run `git init` or `git remote add`. Clone does both for you.

```bash
cd C:\csit340
git clone https://github.com/<username>/<repo>.git
cd <repo>
npm install
npm run dev
```

- `git clone` creates a new folder named after the repo, with all files and history.
- `npm install` is needed because `node_modules` is never stored in the repo.
- To use a different folder name: `git clone <url> <folder-name>`.
- Do not clone into a folder that is already inside another Git repository.
- Confirm the link with `git remote -v`. It should show the URL you cloned from.

## 4. Daily workflow: check, add, commit, push

```bash
git status
git add .
git commit -m "Add Navbar and NavLink components"
git push
```

Good commit messages: short, specific, present tense. "Add ProjectCard component" is good. "stuff" and "final final 2" are not.

Commit often. After each working step is better than one giant commit at the end. Each small commit is a restore point.

| Command | What it does |
| --- | --- |
| `git status` | Shows changed files. Red means unstaged, green means staged. Run it often. |
| `git add <file>` | Stages one file, for example `git add src/App.jsx` |
| `git add .` | Stages everything that changed |
| `git commit -m "message"` | Saves the staged files |
| `git push` | Uploads your new commits to GitHub |
| `git pull` | Downloads and merges new commits from GitHub. Do this before you start work on a second computer. |
| `git diff` | Shows line-by-line changes that are not staged yet |
| `git diff --staged` | Shows the changes that are staged |
| `git log --oneline` | Lists commits, one line each, newest first. Each starts with a short ID. |
| `git log --oneline -5` | Same, but only the last 5 |
| `git remote -v` | Shows which GitHub URL this folder is linked to |

## 5. Undo a mistake

Find your situation in the table, then use that command. `HEAD~1` means "one commit before the latest".

**The safe rule**

- Not pushed yet: you may use `reset` or `commit --amend`.
- Already pushed: use `git revert`. It adds a new commit and does not rewrite history.

| Situation | Command | Effect |
| --- | --- | --- |
| Edited a file and want the old version back (not staged) | `git restore <file>` | Permanently discards your edits to that file |
| Staged a file by mistake | `git restore --staged <file>` | Unstages it. Your edits are kept. |
| Staged everything by mistake | `git restore --staged .` | Unstages all. Edits kept. |
| Typo in the last commit message (not pushed) | `git commit --amend -m "new message"` | Rewrites the last commit's message |
| Forgot a file in the last commit (not pushed) | `git add <file>` then `git commit --amend --noedit` | Adds the file to the last commit |
| Undo last commit, keep changes staged | `git reset --soft HEAD~1` | Commit gone, files still staged |
| Undo last commit, keep changes unstaged | `git reset HEAD~1` | Commit gone, edits still in your files |
| Undo last commit and throw the changes away | `git reset --hard HEAD~1` | Commit and edits both deleted. Cannot be undone easily. |
| Mistake commit is already pushed | `git revert HEAD` then `git push` | Makes a new commit that cancels the last one. Safe. |
| Undo an older commit that is already pushed | `git log --oneline`, copy its ID, then `git revert <id>` and `git push` | Cancels just that commit |

### If you really must rewrite pushed history

Only do this on your own repository, when nobody else has downloaded it. After a `reset`, GitHub will reject a normal push. Use:

```bash
git push --force-with-lease
```

Prefer `git revert` unless you have a reason. Never force-push to a repo shared with groupmates.

### You committed node_modules by mistake

```bash
git rm -r --cached node_modules
git commit -m "Stop tracking node_modules"
git push
```

Make sure `.gitignore` contains the line `node_modules`. The `--cached` flag removes it from Git only and keeps it on your disk.

### You reset too far and lost a commit

Git remembers where you were for a while:

```bash
git reflog
git reset --hard <id-from-reflog>
```

Find the commit you want in the list and use its ID.

## 6. Branches (optional but useful)

```bash
git branch
git switch -c <new-branch>
git switch main
git merge <new-branch>
git push -u origin <new-branch>
```

| Command | What it does |
| --- | --- |
| `git branch` | Lists branches. The current one has a star. |
| `git switch -c <name>` | Creates a branch and moves to it |
| `git switch <name>` | Moves to an existing branch |
| `git merge <name>` | Brings that branch's commits into the one you are on |

For the lab, staying on main is fine.

## 7. Common errors and fixes

| Message | Meaning | Fix |
| --- | --- | --- |
| `fatal: not a git repository` | You are not inside a repo folder | `cd` into the project, or run `git init` |
| `Author identity unknown` / `Please tell me who you are` | Name and email not set | Run the two `git config --global` lines in section 1 |
| `error: remote origin already exists` | You already added a remote | `git remote set-url origin <correct-url>` |
| `error: src refspec main does not match any` | No commit exists yet, or the branch has another name | Commit first, then `git branch -M main`, then push |
| `failed to push some refs` / `fetch first` | GitHub has commits you do not have | `git pull`, fix conflicts if any, then `git push` |
| `refusing to merge unrelated histories` | You made a repo on GitHub with a README and ran `git init` locally | `git pull origin main --allow-unrelated-histories`, then push |
| `Authentication failed` | Wrong credentials | Sign in again in the browser prompt, or use a personal access token |
| `nothing to commit, working tree clean` | No changes since the last commit | Nothing to do. Edit something first. |
| `warning: LF will be replaced by CRLF` | Windows line-ending notice | Harmless. Ignore it. |
| `<<<<<<<`, `=======`, `>>>>>>>` inside a file | Merge conflict markers | Open the file, keep the lines you want, delete the marker lines, then `git add .` and `git commit` |
| Pushed to the wrong URL | Remote points at the wrong repo | `git remote -v`, then `git remote set-url origin <right-url>`, then `git push -u origin main` |

## 8. Quick reference

| Goal | Command |
| --- | --- |
| New project | `git init` |
| Copy a repo | `git clone <url>` |
| See changes | `git status` |
| Stage | `git add .` |
| Save | `git commit -m "message"` |
| Upload | `git push` |
| Download | `git pull` |
| History | `git log --oneline` |
| Discard file edits | `git restore <file>` |
| Unstage | `git restore --staged <file>` |
| Undo last commit, keep work | `git reset HEAD~1` |
| Undo pushed commit | `git revert HEAD` |
| Fix last message | `git commit --amend -m "new"` |
| Check remote | `git remote -v` |

## 9. Before you submit

1. `git status` says `nothing to commit, working tree clean`.
2. `git log --oneline` shows your work.
3. Open the GitHub repository in your browser. The files and latest commit are there.
4. `node_modules` does not appear in the repository.
5. The repository name matches the assignment exactly.
6. Open the link in a private (incognito) window to confirm your teacher can see it.
7. Paste the repository link in the MS Teams assignment.
