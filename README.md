📊 Smart Leads Dashboard

A full-stack Lead Management System built using React, Node.js, Express, MongoDB, and Docker.
It supports authentication, role-based access control, lead management, filtering, pagination, CSV export, and deployment on cloud.

🚀 Live Demo
🌐 Frontend

Render
👉 https://smart-leads-frontend-hs5b.onrender.com

🔗 Backend

👉 https://smart-leads-backend-6gd2.onrender.com

✨ Features
🔐 User Authentication (Login system)
👮 Role-Based Access Control (RBAC)
📊 Dashboard with lead statistics
➕ Create / ✏️ Edit / ❌ Delete leads
🔍 Search, filter, and sort leads
📄 Pagination support
📥 Export leads to CSV
🌙 Dark mode support
🐳 Dockerized full-stack setup
🧰 Tech Stack
Frontend
React (TypeScript)
Vite
Tailwind CSS
Backend
Node.js
Express.js
MongoDB (Mongoose)
JWT Authentication
DevOps
Docker
Docker Compose
Render Deployment
📁 Project Structure
smart-leads-dashboard/
│
├── frontend/        # React frontend
├── backend/         # Node.js backend
├── docker-compose.yml
└── README.md
⚙️ Environment Variables
Backend .env

Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Optional .env.example
PORT=
MONGO_URI=
JWT_SECRET=
🐳 Docker Setup
📦 Prerequisites
Docker installed
Docker Compose installed
🚀 Run the Project
1. Clone repository
git clone https://github.com/anvithareddy-06/smart-leads-dashboard.git
cd smart-leads-dashboard
2. Build containers
docker-compose build
3. Start containers
docker-compose up -d
4. Check running containers
docker ps
5. Open in browser

Frontend:

http://localhost:5173

Backend:

http://localhost:5000

🧱 Architecture
Frontend (React + Vite)
        ↓
Backend (Node + Express)
        ↓
MongoDB Atlas
🚀 Deployment
Frontend
Hosted on Render (Static Site)
Build Command: npm run build
Output Directory: dist
Backend
Hosted on Render (Web Service)
Start Command: npm start
📌 Project Status

✔ Frontend deployed
✔ Backend ready for deployment
✔ Docker setup completed
✔ Full-stack working application

👨‍💻 Author

Anvitha Reddy
Full Stack Developer

⭐ Future Improvements
Real-time analytics dashboard
Email notifications
Advanced role permissions
CI/CD pipeline automation
WebSocket-based live updates
