# Lab 2 - Task 2: Service Orchestration with Docker Compose

This task demonstrates how to run and manage a multi-container application involving an Nginx web server and a MySQL database using Docker Compose.

## Step 1: Start Services

Establish the application stack using `docker-compose`. This starts the Nginx and MySQL services in the background.

```bash
$ docker-compose up -d

[+] Running 21/21
✔ nginx Pulled               176.5s 
✔ mysql_db Pulled            161.1s 
[+] Running 4/4
 ✔ Network task-2_app-net    Created                     0.0s
 ✔ Volume task-2_mysql-data  Created                     0.0s
 ✔ Container mysql-database  Started                     0.3s
 ✔ Container nginx-server    Started                     0.4s
```

## Step 2: Verify the Web Server

Check if the Nginx server is responding correctly on the mapped port.

```bash
$ curl -s http://localhost:8080

<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
...
<h1>Welcome to nginx!</h1>
...
</html>
```

![Nginx Browser View](./imgs/1_framed.png)

## Step 3: Test Internal Communication

Verify that the Nginx container can communicate with the MySQL database container over the docker network.

```bash
$ docker exec nginx-server ping -c 4 mysql_db

PING mysql_db (172.23.0.2): 56 data bytes
64 bytes from 172.23.0.2: seq=0 ttl=64 time=0.039 ms
64 bytes from 172.23.0.2: seq=1 ttl=64 time=0.133 ms
...
--- mysql_db ping statistics ---
4 packets transmitted, 4 packets received, 0% packet loss
```

## Step 4: Verify Volume Persistence

Check the existing docker volumes.

```bash
sudo ranger /var/lib/docker
```

![Volume Check](./imgs/2_framed.png)

## Step 5: Test Data Persistence

Remove the containers and restart them to ensure that the data volume persists.

### Remove Containers

```bash
$ docker compose down

[+] Running 3/3
 ✔ Container nginx-server    Removed                    0.2s
 ✔ Container mysql-database  Removed                    1.3s
 ✔ Network task-2_app-net    Removed                    0.1s    
```

### Restart and Verify

```bash
$ docker compose up -d

[+] Running 3/3
 ✔ Network task-2_app-net    Created          0.0s
 ✔ Container mysql-database  Started          0.2s
 ✔ Container nginx-server    Started          0.3s   
```

Test access again:

```bash
$ curl -s http://localhost:8080 
...
<h1>Welcome to nginx!</h1>
...
```