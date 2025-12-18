# ⚖️ Lab 14: Resource Limits & Scheduled Tasks in OpenShift

Master resource governance using **LimitRanges** and automate operations with **CronJobs**.

## 🛡️ Task 1: Resource Governance (LimitRange)
Ensure your cluster remains stable by enforcing CPU and Memory boundaries for all pods in the project.

### 1. Apply the Limits
```bash
oc create limitrange pod-limit-range \
  --max=cpu=1,memory=1Gi \
  --min=cpu=100m,memory=128Mi \
  --default=cpu=500m,memory=512Mi \
  --default-request=cpu=200m,memory=256Mi \
  --type=Pod
```

### 2. Verify Enforcement
Deploy a test pod to see the limits auto-applied:
```bash
oc run nginx-test-pod --image=nginx:latest --port=80
oc describe pod nginx-test-pod | grep Limits -A 5
```

---

## ⏰ Task 2: Automation (CronJobs)
Set up a recurring task that runs every minute.

### 1. Create the CronJob
```bash
oc create cronjob scheduled-task \
  --image=busybox:latest \
  --schedule="* * * * *" \
  --restart=OnFailure \
  -- /bin/sh -c 'echo "Task executed at $(date)"'
```

### 2. Monitor Execution
```bash
oc get cronjobs
oc get jobs    # View historical runs
oc logs job/<JOB_NAME>
```

---
*Clean up the environment:* `oc delete project limitrange-lab`