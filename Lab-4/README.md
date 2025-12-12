# Lab 4: Advanced Deployment Strategies

This lab demonstrates advanced Kubernetes deployment strategies, including manual scaling, rolling updates, and rollbacks using Deployments and Horizontal Pod Autoscalers (HPA).

## Step 1: Deploy Web Application

Initialize the application stack in the `web-app` namespace, including the Deployment, Service, ResourceQuota, and HPA.

```bash
$ kubectl apply -f namespace.yaml -f service.yaml -f deployment.yaml -f quota.yaml -f hpa.yaml

namespace/web-app created
service/nginx-service created
deployment.apps/nginx-deployment created
resourcequota/webapp-quota created
horizontalpodautoscaler.autoscaling/nginx-hpa created
```

## Step 2: Manual Scaling

Manually scale the deployment to 4 replicas and verify the scaling operation.

```bash
$ kubectl scale deployment nginx-deployment --replicas=4 -n web-app

deployment.apps/nginx-deployment scaled

# Check the pods
$ kubectl get pods -n web-app
NAME                               READY   STATUS    RESTARTS   AGE
nginx-deployment-c6c897f54-fzrvf   1/1     Running   0          8s
...
```

## Step 3: Perform a Rolling Update

Apply a configuration change to trigger a rolling update. Kubernetes will incrementally replace old pods with new ones.

```bash
$ kubectl apply -f rolling-update.yaml

deployment.apps/nginx-deployment configured

# specific command to watch the rollout status
$ kubectl rollout status deployment/nginx-deployment -n web-app

Waiting for deployment "nginx-deployment" rollout to finish: 2 out of 4 new replicas have been updated...
...
deployment "nginx-deployment" successfully rolled out

# Verify new pods are running on nodes
$ kubectl get pods -n web-app -o wide
NAME                              READY   STATUS    RESTARTS   IP
nginx-deployment-7c7bbd47-c97bh   1/1     Running   0          10.244.0.31
...
```

## Step 4: Rollback Deployment

Simulate a rollback to a previous version of the deployment.

### Check History
```bash
$ kubectl rollout history deployment/nginx-deployment -n web-app

REVISION  CHANGE-CAUSE
1         <none>
2         <none>
```

### Undo Rollout
```bash
$ kubectl rollout undo deployment/nginx-deployment -n web-app

deployment.apps/nginx-deployment rolled back

$ kubectl rollout status deployment/nginx-deployment -n web-app
deployment "nginx-deployment" successfully rolled out
```

### Verify Rollback
```bash
# Check history again to see the new revision
$ kubectl rollout history deployment/nginx-deployment -n web-app
REVISION  CHANGE-CAUSE
2         <none>
3         <none>
```

## Step 5: Final Verification

Inspect all resources (Pods, Service, HPA, Quota) to ensure the cluster state is as expected.

```bash
$ kubectl get all -n web-app

NAME                                   READY   STATUS    RESTARTS   AGE
pod/nginx-deployment-c6c897f54-g5t2x   1/1     Running   0          3m24s
...

$ kubectl get hpa -n web-app
NAME        TARGETS              MINPODS   MAXPODS   REPLICAS
nginx-hpa   cpu: <unknown>/70%   2         8         4
```