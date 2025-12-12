# Lab 2 - Task 1: Flask Microservice

This guide walks through the process of setting up, running, building, and containerizing a simple Flask application.

## Step 1: Install Dependencies

First, install the required python dependencies described in `requirements.txt`.

```bash
$ pip install -r requirements.txt

WARNING: Ignoring invalid distribution ~ip (/home/o0xwolf/.local/share/pip/lib/python3.13/site-packages)
Collecting Flask==3.0.3 (from -r requirements.txt (line 1))
...
Successfully installed Flask-3.0.3 Jinja2-3.1.6 MarkupSafe-3.0.3 Werkzeug-3.1.3 blinker-1.9.0 itsdangerous-2.2.0
```

## Step 2: Run the Application Locally

Start the Flask application globally to verify it works before containerizing.

```bash
$ python app.py

 * Serving Flask app 'app'
 * Debug mode: off
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://192.168.1.17:5000
Press CTRL+C to quit
```

## Step 3: Build the Docker Image

Build the Docker image using the provided `Dockerfile`. We will tag the image as `flask-microservice:v1`.

```bash
$ docker build -t flask-microservice:v1

Sending build context to Docker daemon  10.24kB
Step 1/7 : FROM python:3.11-slim
...
Successfully built 00370284db60
Successfully tagged flask-microservice:v1
```

## Step 4: Run the Docker Container

Run the newly built image in a detached container, mapping port 8080 on the host to port 5000 in the container.

```bash
$ docker run -d -p 8080:5000 --name flask-app flask-microservice:v1
d0b7424ccf369c47b91b2f6f69f836dfd677f9477333760ed9e0dff3c7e42a08
```

## Step 5: Test the Application

Verify the application is running inside the container by sending a request to localhost on port 8080.

```bash
$ curl http://localhost:8080

Hello from Flask running inside Docker! Welcome, DevOps Engineer!
```

---
**Visual Verification:**

![Flask App Browser View](./imgs/1_framed.png)