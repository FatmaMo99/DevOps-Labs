# 🦾 Lab 15: Advanced DaemonSets & Privileged Access

Deploy system-level monitoring or logging tools across every node in the cluster using **DaemonSets** and **ServiceAccounts**.

## 🏗️ 1. Project & Identity Setup
Create the project and a dedicated identity for the system-level task:
```bash
oc new-project lab15-daemonset-ozil
oc create serviceaccount privileged-daemonset-sa
```

## 🔐 2. Elevate Privileges
Grant the service account `anyuid` permissions to allow the container to run as root:
```bash
oc adm policy add-scc-to-user anyuid -z privileged-daemonset-sa
```

## 🚀 3. Deploy the DaemonSet
Apply the [**`daemonset.yaml`**](daemonset.yaml) configuration:
```bash
oc apply -f daemonset.yaml
```

## ✅ 4. Verification
Check if the DaemonSet is successfully running a pod on every node:
```bash
oc get daemonset
oc get pods -o wide
```

---
*Clean up:* `oc delete project lab15-daemonset-ozil`
