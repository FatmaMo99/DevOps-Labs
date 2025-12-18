# 🛠️ Lab 6: Ansible Ad-Hoc Commands & Playbooks

Master infrastructure management by using Ansible for quick tasks (Ad-Hoc) and structured automation (Playbooks).

## 🚀 Overview
In this lab, you will learn how to:
1. Verify connectivity across multiple nodes.
2. Manage packages and services using Ad-Hoc commands.
3. Automate multi-step setups using YAML Playbooks.

---

## 💻 Environment Setup
Ensure your Vagrant environment is up and running:
```bash
vagrant global-status
# To get specific connection info
vagrant ssh-config <node_id>
```

---

## ⚡ Part 1: Ansible Ad-Hoc Commands
Ad-Hoc commands are one-liners used for quick, non-repetitive tasks.

### 1. Check Connectivity (Ping)
```bash
ansible all -m ping
```

### 2. Install Nginx
```bash
ansible all -m package -a "name=nginx state=present" --become
```

### 3. Verify Installation
```bash
ansible all -m command -a "nginx -v"
```

### 4. Remove Nginx
```bash
ansible all -m package -a "name=nginx state=absent" --become
```

---

## 📜 Part 2: Ansible Playbooks
Playbooks are YAML files that define a sequence of tasks to reach a desired state.

### 1. Run the Playbook
Execute the provided `playbook.yaml` which handles package management, variables, and loops:
```bash
ansible-playbook playbook.yml
```

### 2. Key Concepts in the Playbook
- **Variables**: Dynamic naming for packages.
- **Loops**: Efficiently installing multiple tools (git, curl, wget, vim).
- **Handlers/Services**: Ensuring Nginx is started and enabled.

### 3. Verify Service Status
```bash
ansible all -m service -a "name=nginx state=started" --become
```

---

## 📁 Files in this Lab
- `ansible.cfg`: Configuration for Ansible.
- `inventory`: List of target hosts.
- `playbook.yaml`: The automation script.