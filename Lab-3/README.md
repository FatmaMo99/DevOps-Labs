# Lab 3: Kubernetes Namespaces, Deployments, and Quotas

This lab covers the creation of namespaces, deploying applications (Nginx and MySQL), managing connectivity, scaling applications, and enforcing resource quotas.

## Step 1: Create Web-App Namespace

Create a dedicated namespace for the web application to isolate its resources.

```bash
$ kubectl apply -f webapp-namespace.yaml

namespace/web-app created

$ kubectl get namespaces
NAME              STATUS   AGE
default           Active   163m
web-app           Active   18s
```

## Step 2: Deploy Nginx Application

Deploy the Nginx deployment and service into the `web-app` namespace.

```bash
$ kubectl apply -f nginx-deployment.yaml -f nginx-service.yaml

deployment.apps/nginx-deployment created
service/nginx-service created

# Verify pods are running
$ kubectl get pods -n web-app
NAME                               READY   STATUS    RESTARTS   AGE
nginx-deployment-c6c897f54-bws2t   1/1     Running   0          52s
nginx-deployment-c6c897f54-jrz9x   1/1     Running   0          52s
```

## Step 3: Test Connectivity

Retrieve the NodePort and access the application to verify it is serving traffic.

```bash
# Get the service details
$ kubectl get service nginx-service -n web-app
NAME            TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
nginx-service   NodePort   10.97.207.246   <none>        80:30799/TCP   117s

# Get the Minikube Node IP
$ kubectl get nodes -o wide
NAME       STATUS   ROLES           INTERNAL-IP
minikube   Ready    control-plane   192.168.49.2

# Test access using curl (IP:Port)
$ curl http://192.168.49.2:30799/

<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
...
<h1>Welcome to nginx!</h1>
...
</html>
```

Depending on your environment, you can also open the service directly:

```bash
$ minikube service nginx-service -n web-app
```

## Step 4: Scale the Deployment

Demonstrate scaling the application up to handle more load.

```bash
# Scale to 3 replicas
$ kubectl scale deployment nginx-deployment -n web-app --replicas=3

deployment.apps/nginx-deployment scaled

$ kubectl get pods -n web-app
NAME                               READY   STATUS    RESTARTS   AGE
nginx-deployment-c6c897f54-5qbdw   1/1     Running   0          25s
...

# Scale to 4 replicas
$ kubectl scale deployment nginx-deployment -n web-app --replicas=4
deployment.apps/nginx-deployment scaled
```

## Step 5: Apply Resource Quotas

Enforce CPU and Memory limits on the namespace to prevent resource exhaustion.

```bash
$ kubectl apply -f quota.yaml

resourcequota/web-app-quota created

# Inspect the quota
$ kubectl describe resourcequota web-app-quota -n web-app
Name:            web-app-quota
Namespace:       web-app
Resource         Used   Hard
--------         ----   ----
limits.cpu       800m   1
limits.memory    1Gi    2Gi
pods             4      5
```

### Test Quota Enforcement

Attempting to scale beyond the quota limits (e.g., 15 replicas) should fail or partially fail.

```bash
$ kubectl scale deployment nginx-deployment -n web-app --replicas=15

# Verify that only 5 pods are created (due to the hard limit of 5 pods)
$ kubectl describe resourcequota web-app-quota -n web-app
Resource         Used    Hard
--------         ----    ----
pods             5       5
```

## Step 6: Deploy Database Application

Create a separate namespace for the database and deploy a MySQL instance with environment variables.

### Create DB Namespace

```bash
$ kubectl apply -f db-namespace.yaml
namespace/db-app created
```

### Deploy MySQL

```bash
$ kubectl apply -f mysql-deployment.yaml
deployment.apps/mysql-deployment created

# Check deployment status
$ kubectl get deployments -n db-app
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
mysql-deployment   0/1     1            0           36s
```

### Verify Environment Variables

Check that the MySQL environment variables (Password, Database Name) are correctly injected.

```bash
# Verify inside the running pod/container
$ kubectl exec -it $(kubectl get pod -n db-app -l app=mysql -o jsonpath='{.items[0].metadata.name}') -n db-app -- env | grep MYSQL

MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_DATABASE=mydb
MYSQL_VERSION=9.4.0-1.el9
```

## Step 7: Cleanup

Remove all created resources to clean up the cluster.

```bash
$ kubectl delete -f db-namespace.yaml -f mysql-deployment.yaml -f nginx-deployment.yaml -f nginx-service.yaml -f quota.yaml -f webapp-namespace.yaml
```