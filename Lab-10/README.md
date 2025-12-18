# 🏗️ Lab 10: Jenkins CI/CD Pipeline for Node.js

Automate building, testing, and deploying a Dockerized Node.js application using Jenkins.

## 📋 Prerequisites
Ensure the following are installed and configured:
- **Jenkins Server** with Docker permissions.
- **Docker** installed on the Jenkins host.
- **Plugins**: Docker, Docker Pipeline, and NodeJS.

---

## ⚙️ Jenkins Job Setup
1. **New Item**: Create a "Pipeline" named `nodejs-docker-pipeline`.
2. **Configuration**: 
   - Under **Pipeline Definition**, select "Pipeline script from SCM".
   - **SCM**: Git.
   - **Repository URL**: `https://github.com/abdelrahmanonline4/sourcecode`.
   - **Branch**: `main`.
   - **Script Path**: `Jenkinsfile`.

---

## 🚀 Pipeline Stages
The [**`Jenkinsfile`**](Jenkinsfile) automates these steps:

1. **Checkout**: Pulls the latest code from GitHub.
2. **Build Image**: Creates a Docker image tagged with the build number.
3. **Run Container**: 
   - Stops the old container (if it exists).
   - Starts a new container on **Port 3000**.
4. **Verify**: Ensures the application is running and logs are healthy.

---

## 🛠️ Verification & Troubleshooting

### Useful Commands
```bash
# Check if the container is running
docker ps

# View application logs
docker logs nodejs-app-container

# Verify website access
curl http://localhost:3000
```

### Common Fixes
- **Permissions**: Run `sudo chmod 666 /var/run/docker.sock` if Jenkins cannot access Docker.
- **Port Conflict**: Ensure port 3000 is not blocked or used by another app.

---

## 📁 Key Files
- `Jenkinsfile`: The core pipeline logic.
- `Dockerfile`: Instructions for building the Node.js image.
- `app.js`: The application source code.