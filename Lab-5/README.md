# Lab 5: ConfigMaps, Secrets, and Persistent Storage

This lab demonstrates how to deploy a MySQL database using Kubernetes best practices. You will use ConfigMaps for configuration, Secrets for sensitive data, Persistent Volumes for storage, and Taints/Tolerations for pod scheduling.

## Step 1: Prepare the Environment

Apply taints to the node to restrict scheduling to only specific pods, ensuring our database runs in an isolated environment.

```bash
$ kubectl taint nodes minikube db=only:NoSchedule --overwrite
node/minikube modified
```

## Step 2: Create Configurations and Secrets

Generate the ConfigMap from a file and the Secret from an environment file.

```bash
$ kubectl create configmap mysql-config --from-file=config.txt
configmap/mysql-config created

$ kubectl create secret generic mysql-secret --from-env-file=secret.txt
secret/mysql-secret created
```

## Step 3: Deploy Persistent Storage

Set up the Persistent Volume (PV) and Persistent Volume Claim (PVC) to ensure data persists across pod restarts.

```bash
$ kubectl apply -f mysql-pv.yaml
persistentvolume/mysql-pv created

$ kubectl apply -f mysql-pvc.yaml
persistentvolumeclaim/mysql-pvc created
```

## Step 4: Deploy MySQL Application

Deploy the MySQL application using the Deployment and Service manifests.

```bash
$ kubectl apply -f mysql-deployment.yaml
deployment.apps/mysql-deployment created

$ kubectl apply -f mysql-service.yaml
service/mysql-service created
```

## Step 5: Verify Resources

Confirm that all resources have been created and are running correctly.

### Check Pods and ConfigObjects
```bash
$ kubectl get pods
NAME                                READY   STATUS    RESTARTS   AGE
mysql-deployment-77b57d4456-rvmdr   1/1     Running   0          2m13s

$ kubectl get configmap mysql-config
NAME           DATA   AGE
mysql-config   1      5m39s

$ kubectl get secret mysql-secret
NAME           TYPE     DATA   AGE
mysql-secret   Opaque   4      5m37s
```

### Verify ConfigMap Content
```bash
$ kubectl describe configmap mysql-config
...
Data
====
config.txt:
----
port=3306
bind-address=0.0.0.0
max_connections=100
innodb_buffer_pool_size=128M
...
```

### Verify Pod Scheduling & Tolerations
Check that the pod was scheduled on the tainted node due to matching tolerations.

```bash
$ kubectl describe pod mysql-deployment-77b57d4456-rvmdr | grep -A 10 "Tolerations:"
Tolerations:                 db=only:NoSchedule
```

### Verify Environment Variables
Check if the secret values were successfully injected as environment variables.

```bash
$ kubectl exec -it mysql-deployment-77b57d4456-rvmdr -- env | grep MYSQL
MYSQL_ROOT_PASSWORD=rootpassword123
MYSQL_DATABASE=testdb
...
```

## Step 6: Test Database Functionality

Connect to the database instance inside the pod and perform a simple create/insert/select test.

```bash
$ kubectl exec -it mysql-deployment-77b57d4456-rvmdr -- mysql -u testuser -puserpassword123 testdb -e "
CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50));
INSERT INTO users (name) VALUES ('John Doe'), ('Jane Smith');
SELECT * FROM users;"

+----+------------+
| id | name       |
+----+------------+
|  1 | John Doe   |
|  2 | Jane Smith |
+----+------------+
```

## Step 7: Cleanup

Remove all resources created during this lab.

```bash
$ kubectl delete -f .
$ kubectl delete configmap mysql-config
$ kubectl delete secret mysql-secret
```