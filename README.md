# Smart Task Manager

Welcome to the Smart Task Manager, a full-stack application designed for efficient task tracking and user management. The system is built with a modern technology stack and a security-first architecture.

## Application Purpose

The Smart Task Manager provides a platform for users to create, manage, and monitor tasks. Key features include:
- **Task Management:** Create new tasks, assign them to users, and track their status (e.g., Pending, In Progress, Completed).
- **User Monitoring:** View user roles and their assigned tasks.
- **Contact Form:** Allows external users to send messages via a secure API endpoint.
- **Secure Media Uploads:** Users can securely upload files (e.g., avatars, task attachments) directly to a cloud media service.

---

## Technology Stack

This project integrates the following technologies for a robust, scalable, and secure application:

- **Backend:** Python with the **Flask** framework and **Gunicorn** as the production WSGI server.
- **Frontend:** **Next.js** (a React framework) with **TypeScript**.
- **Database:** **PostgreSQL**, running in a container for consistency across environments.
- **Containerization:** **Docker** and **Docker Compose** for creating reproducible and isolated development and production environments.
- **CI/CD:** **GitHub Actions** for automating security scans, testing, and container image builds.
- **Media Management:** **Cloudinary** for secure cloud-based storage and delivery of media assets.

---

## Getting Started: Secure Local Development

This project uses Docker Compose to streamline the local development setup.

### Prerequisites
- Docker Desktop installed and running.

### 1. Configure Environment Secrets

You must create `.env` files for the backend and frontend from the provided templates. **These files contain secrets and should never be committed to Git.**

**For the backend:**
```bash
# In the 'backend/' directory, copy the example file
cp .env.example .env
```
Now, open `backend/.env` and review the values. The defaults are configured to work with Docker Compose.

**For the frontend:**
```bash
# In the 'frontend/' directory, copy the example file
cp .env.local.example .env.local
```
Open `frontend/.env.local` and fill in your email credentials.

### 2. Build and Run the Application
From the root directory of the project, run the following command:
```bash
docker-compose up --build
```
- `--build`: This flag tells Docker Compose to build the images from the `Dockerfile`s before starting the containers. You only need to use it the first time or after making changes to a `Dockerfile`.

The application will be available at:
- **Frontend (Next.js):** `http://localhost:3000`
- **Backend (Flask API):** `http://localhost:5000`

---

## DevSecOps & CI/CD Workflow

This project is configured with a GitHub Actions pipeline (`.github/workflows/main.yml`) that automates security checks and builds.

### Key Stages:

1.  **Trigger:** The workflow runs on every `push` or `pull_request` to the `main` branch.
2.  **Security Scanning (SAST):**
    -   **Python Backend:** The `bandit` tool is run to perform Static Application Security Testing on the Flask codebase. This checks for common vulnerabilities like hardcoded secrets, insecure configurations, and dangerous function calls.
    -   **Node.js Frontend:** `npm audit` is run to scan all frontend dependencies for known vulnerabilities. The pipeline is configured to fail if any high-severity issues are found.
3.  **Build Docker Images:** If the security scans pass, the workflow proceeds to build the production-ready Docker images for the frontend and backend.
4.  **Push to Registry:** The newly built images are tagged and pushed to a container registry (e.g., Docker Hub), making them ready for deployment.

This "shift-left" approach to security ensures that vulnerabilities are caught early in the development cycle, long before they reach production.

---

## Security Features Overview

This application has been hardened with the following security measures:

- **No Hardcoded Secrets:** All secrets (database URIs, API keys, etc.) are loaded from environment variables, never stored in the code.
- **Principle of Least Privilege:** Docker containers run as **non-root users**, minimizing the potential impact of a container breakout vulnerability.
- **Secure Uploads:** File uploads use **Cloudinary Signed Signatures**. The backend grants temporary permission for each upload, preventing unauthorized users from flooding your storage.
- **Reduced Attack Surface:** **Multi-stage Docker builds** create minimal production images, excluding build tools and source code, which reduces the potential for exploits.
- **Automated Vulnerability Scanning:** The CI/CD pipeline automatically scans both application code (`bandit`) and third-party dependencies (`npm audit`) for security flaws.
- **Content Security:** The Next.js frontend is configured to only load images from your trusted Cloudinary domain, preventing cross-site content injection.
