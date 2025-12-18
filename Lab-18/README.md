# ⚖️ Lab 18: Scalable AWS Infrastructure with Terraform

Deploy a high-availability architecture featuring EC2 instances distributed across availability zones, managed by an **Application Load Balancer (ALB)**.

## 📐 Architecture
- **ALB**: Entry point, distributes traffic.
- **EC2**: Multiple workers running the application.
- **VPC**: Isolated networking.

## 🚀 Execution Workflow

### 1. Initialization
```bash
cd tf
terraform init
terraform validate
```

### 2. Infrastructure Plan
```bash
terraform plan
```

### 3. Deploy
```bash
terraform apply -auto-approve
```

## ✅ Access & Test
Retrieve the Load Balancer URL and test the connection:
```bash
terraform output alb_url
curl $(terraform output -raw alb_url)
```

---
*Cleanup:* `terraform destroy -auto-approve`
