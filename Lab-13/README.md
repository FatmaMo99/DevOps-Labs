# 🚩 Lab 13: Secure Web Deployment on OpenShift

Learn how to deploy a secure Nginx application using **Security Context Constraints (SCC)** and **HTTPS Edge Termination**.

## 🚀 Step 1: Initialize the Project
Create a dedicated space for your application:
```bash
oc new-project nginx-ozil
```

## 🔐 Step 2: Security & Permissions
Assign the `anyuid` Security Context Constraint to the default service account to allow the Nginx container to run with its required UID:
```bash
oc adm policy add-scc-to-user anyuid -z default -n nginx-ozil
```

## 📦 Step 3: Deploy Nginx
Launch the application using a standard Docker image:
```bash
oc new-app --name=nginx-app --image=nginx:latest
```

## 🌐 Step 4: Secure External Access
Expose the service globally using an **HTTPS Route** with Edge Termination (the router handles the SSL/TLS):
```bash
oc create route edge nginx-https-route --service=nginx-app --port=80
```

## ✅ Verification
1. **Check Status**: `oc status`
2. **Retrieve URL**: `oc get routes`
3. **Test with Curl**:
   ```bash
   curl -k https://<YOUR_ROUTE_HOST>
   ```

---
*Key Achievements: SCC Management, HTTPS Routing, and Rapid Deployment.*
