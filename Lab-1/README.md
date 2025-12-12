# Docker Network Configuration and Service (Lab 1)

## Lab Objectives
In this lab, we will explore advanced Docker networking concepts, including:
- Creating custom bridge networks.
- Managing IP address allocation (Subnets and Gateways).
- Service discovery and internal connectivity between containers.
- Setting up multi-network environments.
- Validating network isolation and security.

---

# Task 1: Custom Bridge Network

### Goal
Create a custom bridge network with a specific subnet and gateway, deploy containers into it, and verify that they can communicate with each other using their container names.

### 1. Create a Custom Bridge Network
We will create a network named `hr-app-net` with the following specifications:
- **Driver:** `bridge`
- **Subnet:** `192.168.20.0/24`
- **Gateway:** `192.168.20.1`

Run the following command:
```bash
docker network create \
  --driver bridge \
  --subnet 192.168.20.0/24 \
  --gateway 192.168.20.1 \
  hr-app-net
```

### 2. Verify Network Configuration
To confirm the network was created correctly, inspect it:
```bash
docker network inspect hr-app-net
```
*Alternatively, verify just the Subnet and Gateway:*
```bash
docker network inspect hr-app-net | egrep "Subnet|Gateway"
```
**Expected Output:**
```json
"Subnet": "192.168.20.0/24",
"Gateway": "192.168.20.1"
```

### 3. Deploy Containers
Now, let's launch two containers attached to this new network.

**Run an Nginx server:**
```bash
docker run -d --name nginx-server --network hr-app-net nginx
```

**Run an Alpine container for testing:**
```bash
docker run -it --name alpine-tester --network hr-app-net alpine sh
```
*(Note: This command will open an interactive shell. Keep this terminal open for the testing steps below.)*

### 4. Verify IP Assignment
Open a **new terminal window** to verify the IP addresses assigned to your containers.

**Check Nginx IP:**
```bash
docker inspect nginx-server | egrep "Gateway|IPAddress"
```
*Expected: `192.168.20.2` (or similar within range)*

**Check Alpine IP:**
```bash
docker inspect alpine-tester | egrep "Gateway|IPAddress"
```
*Expected: `192.168.20.3` (or similar within range)*

### 5. Test Service Discovery
From your `alpine-tester` terminal (the one running `sh`), try to ping the **nginx-server** by its name. This verifies that Docker's built-in DNS is resolving container names correctly.

```bash
ping -c 4 nginx-server
```
**Success:** You should see responses indicating 0% packet loss.

### Cleanup
When finished, remove the containers and network:
```bash
docker rm -f nginx-server alpine-tester
docker network rm hr-app-net
```

---

# Task 2: Multi-Network Isolation

### Goal
Simulate a tiered application architecture with a Frontend network and a Backend network.
- **Frontend Network:** Accessible by clients.
- **Backend Network:** Isolated, accessible only by the Load Balancer/App Server.
- **Load Balancer:** Connected to *both* networks to bridge traffic.

### 1. Create Networks
**Create the Frontend Network (`frontend-net`):**
```bash
docker network create \
  --driver bridge \
  --subnet 10.1.1.0/24 \
  frontend-net
```

**Create the Backend Network (`backend-net`):**
```bash
docker network create \
  --driver bridge \
  --subnet 10.1.2.0/24 \
  backend-net
```

### 2. Deploy Containers
We will set up three containers with specific network attachments:

1.  **`backend-db`**: Connected ONLY to `backend-net`.
    ```bash
    docker run -it --name backend-db --network backend-net alpine sh
    ```
    *(Open a new terminal for the next commands)*

2.  **`client-tester`**: Connected ONLY to `frontend-net`.
    ```bash
    docker run -it --name client-tester --network frontend-net alpine sh
    ```
    *(Open a new terminal for the next commands)*

3.  **`nginx-lb`** (Load Balancer): Connected to **BOTH** networks.
    ```bash
    docker run -d --name nginx-lb --network frontend-net --network backend-net nginx
    ```

### 3. Verify IP Allocation for Multi-Homed Container
Check the IPs for `nginx-lb`. It should have an address in both ranges.
```bash
docker inspect nginx-lb | egrep "Gateway|IPAddress"
```
*You should see IPs from both `10.1.1.x` and `10.1.2.x`.*

### 4. Test Isolation and Routing

**Test Isolation:**
From the `client-tester` terminal, try to ping the `backend-db`.
```bash
ping -c 4 backend-db
```
**Result:** This should **FAIL** (`bad address` or timeout). This proves the networks are isolated.

**Test Connectivity via Load Balancer:**
Log into the `nginx-lb` container (which has access to both networks).
```bash
docker exec -it nginx-lb sh
```

Inside `nginx-lb`, install ping (Nginx images often lack ping tools):
```bash
apt update && apt install -y iputils-ping
```

**Ping the Backend:**
```bash
ping -c 4 backend-db
```
*(Success)*

**Ping the Client:**
```bash
ping -c 4 client-tester
```
*(Success)*

This confirms that the `nginx-lb` container acts as a bridge between the isolated networks.

### Cleanup
Remove all resources:
```bash
docker rm -f nginx-lb backend-db client-tester
docker network rm frontend-net backend-net
```
