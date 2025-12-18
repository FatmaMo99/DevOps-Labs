# 🏛️ Lab 16: Multi-Tier Architecture on OpenShift

Deploy a complete production-grade stack including a **Database**, **Backend API**, and a **Reverse Proxy**.

## 🧩 Architecture Overview
- **Storage**: Persistent Volume Claims for DB persistence.
- **Database**: Secured MySQL/PostgreSQL deployment.
- **Backend**: Microservice connected to the DB.
- **Proxy**: Nginx Proxy handling external traffic.

## 🚀 Deployment Steps

### 1. Networking & Security
Apply ServiceAccounts and RBAC policies:
```bash
oc apply -f openshift/serviceaccount-and-rbac.yaml
oc apply -f openshift/scc-root-access.yaml
```

### 2. Persistence & Secrets
Initialize database storage and credentials:
```bash
oc apply -f openshift/db-secret.yaml
oc apply -f openshift/db-data-pvc.yaml
```

### 3. Database Layer
```bash
oc apply -f openshift/database_deployment.yaml
oc apply -f openshift/db-service.yaml
```

### 4. Application & Proxy Layer
```bash
oc apply -f openshift/backend_deployment.yaml
oc apply -f openshift/proxy_deployment.yaml
oc create -f openshift/proxy_route.yaml
```

## ✅ Final Verification
Check all components:
```bash
oc get all
oc status
```
Access the application through the generated **Proxy Route**.