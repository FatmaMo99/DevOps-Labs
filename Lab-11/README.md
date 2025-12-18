# 🎡 Lab 11: GitOps with ArgoCD

Implement Continuous Delivery (CD) using ArgoCD to synchronize Kubernetes manifests with your cluster.

## 🚀 Step 1: Install ArgoCD
Run these commands to set up ArgoCD in your Kubernetes cluster:

```bash
# 1. Create the namespace
kubectl create namespace argocd

# 2. Install ArgoCD manifests
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# 3. Wait for pods to be ready
kubectl get pods -n argocd
```

---

## 🔑 Step 2: Access the Web UI

### 1. Retrieve the Admin Password
```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d && echo
```

### 2. Forward the Port
```bash
kubectl port-forward svc/argocd-server -n argocd 9090:443
```
*Access via browser:* [https://localhost:9090](https://localhost:9090) (Login: `admin`).

---

## 📦 Step 3: Deploy an Application (GUI)
1. In ArgoCD Dashboard, click **"NEW APP"**.
2. **Name**: `nginx-app` | **Project**: `default` | **Sync**: `Manual`.
3. **Repo URL**: `https://github.com/abdelrahmanonline4/lab-seniorLab`.
4. **Path**: `.` | **Namespace**: `default`.
5. Click **CREATE** then **SYNC** to deploy the Nginx app.

---

## ✅ Step 4: Verification
Verify that Nginx is running correctly:

```bash
# Check resources in default namespace
kubectl get all

# Access the deployed Nginx
kubectl port-forward service/nginx 8080:80
```
Visit `http://localhost:8080` to see your running app! ✨

---

## 🛠️ Troubleshooting
- **Login Issues**: If the password doesn't work, reset it using the `kubectl patch` command provided in previous documentation.
- **Sync Failure**: Verify that the GitHub Repository URL is correct and public.
