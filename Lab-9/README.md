# 🐙 Lab 9: Git Branching and Workflow

Master essential Git operations for managing source code, branches, and remote repositories.

## 🚀 Key Tasks

### 1. Clone a Specific Branch
To pull only a specific branch from a repository:
```bash
git clone -b <branch-name> <repo-url>
```
*Example:*
```bash
git clone -b nodejs-docker-task https://github.com/abdelrahmanonline4/EFE-Labs-.git
```

### 2. Repository Initialization
If you want to start fresh:
```bash
# Remove existing Git history
rm -rf .git

# Initialize a new local repository
git init
```

### 3. Connecting to a Remote Server
Link your local code to a new GitHub repository:
```bash
git remote add origin https://github.com/mmsaeed509/Lab-9.git
```

### 4. Automated Pushing
This lab includes a [**`git-push.sh`**](git-push.sh) script to simplify the commit and push process.

```bash
# Push with a custom message
./git-push.sh -m "Added source code and assets"

# Or let the script generate a generic message
./git-push.sh
```

### 5. Switching Branches
To move to the branch containing Docker configurations:
```bash
git checkout docker-build
# or
git switch docker-build
```

---

## 📁 Repository Structure
- `src/`: Application logic using CSS-based badges.
- `public/`: Static assets and updated `index.html`.
- `git-push.sh`: Automation script for Git workflow.