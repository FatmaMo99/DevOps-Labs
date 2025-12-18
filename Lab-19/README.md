# 🛡️ Lab 19: Infrastructure Resilience with AWS Backup

Automate data protection for your AWS resources using Terraform and **AWS Backup**.

## 🎯 Goal
Ensure your critical EC2 instances and volumes are automatically backed up according to a defined schedule.

## 🚀 Deployment
```bash
# Initialize and apply
terraform init
terraform apply -auto-approve

# View Backup Vault details
terraform output
```

## 🔍 Key Components
- **Backup Vault**: Secure storage for recovery points.
- **Backup Plan**: Defines when and how often backups occur.
- **Selection**: Targets specific resources based on tags.

---
*Cleanup:* `terraform destroy -auto-approve`
