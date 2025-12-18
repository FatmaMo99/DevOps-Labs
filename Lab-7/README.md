# ☁️ Lab 7: AWS EC2 User Data Automation

Automate the deployment of a web server on AWS EC2 instances using a bootstrap script.

## 🎯 Objective
Automatically install, configure, and launch an Apache (HTTPD) web server the moment an EC2 instance starts.

## 📜 The User Data Script
When launching your EC2 instance (Amazon Linux/RHEL), paste the following code into the **Advanced Details -> User Data** field:

```bash
#!/bin/bash
# 1. Update all system packages
yum update -y

# 2. Install Apache Web Server
yum install -y httpd

# 3. Enable and Start Apache service
systemctl enable httpd
systemctl start httpd

# 4. Create a custom Welcome Page
cat <<EOF > /var/www/html/index.html
<!DOCTYPE html>
<html>
<head>
    <title>DevOps Lab 7</title>
    <style>
        body {
            background-color: #0f0f0f;
            color: #00b0c8;
            font-family: Arial, sans-serif;
            text-align: center;
            padding-top: 100px;
        }
        h1 { font-size: 3em; }
    </style>
</head>
<body>
    <h1>🚀 Welcome to My Apache Server on AWS!</h1>
    <p>This instance was successfully provisioned using <b>User Data</b> automation.</p>
</body>
</html>
EOF

# 5. Restart to apply changes
systemctl restart httpd
```

## ✅ Verification
1. Once the instance is **Running**, copy its **Public IP**.
2. Open your browser and navigate to `http://<YOUR_IP>`.
3. You should see the custom blue and black welcome page.