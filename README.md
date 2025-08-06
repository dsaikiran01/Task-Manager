# 🛠️ Fullstack Task Manager App (React + Express + MongoDB Atlas)

A full-stack web application with:

- ✅ **JWT authentication**
- ✅ **Role-based user authorization** (Admin/User)
- ✅ **Task management system**
- ✅ **MongoDB Atlas** as cloud database
- ✅ **Dockerized backend**
- ✅ **Frontend deployed to Vercel**
- ✅ **Backend deployed to Render**

---

## 🚀 Live Demo

- **Frontend**: [https://task-manager-eptpuc6d6-dsks-projects-0211b47a.vercel.app/](https://task-manager-eptpuc6d6-dsks-projects-0211b47a.vercel.app/)
<!-- - **Backend API**: [https://your-backend.onrender.com](https://your-backend.onrender.com) -->

---

## 🧑‍💻 Features

### 👤 Authentication & Authorization
- Register and login with secure JWT
- Auth context with protected routes
- Role-based UI and API access (Admin vs User)

### 🗂️ Task Management
- Create, view, edit, delete tasks
- Admins can manage all tasks
- Users manage only their own

### 🔐 Security
- Passwords hashed with bcrypt
- JWT stored in localStorage
- Role-based middleware

### 🌐 Deployment
- Frontend hosted on **Vercel**
- Backend hosted on **Render**
- MongoDB hosted on **MongoDB Atlas**

---

## ⚙️ Setup Instructions (Local)

### 1. Clone the repo
```bash
git clone https://github.com/dsaikiran01/Task-Manager.git
cd your-repo
```

### 2. Environment variables

#### 🔐 Backend (`/backend/.env`)
```env
MONGO_URI=your-atlas-uri
JWT_SECRET=your-secret-key
PORT=5000
```

#### 🌍 Frontend (`/frontend/.env`)
```env
VITE_BACKEND_API=https://your-backend.onrender.com
```

---

### 3. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

### 4. Run the app locally

```bash
# Start backend
cd backend
npm start

# Start frontend
cd ../frontend
npm start
```

---

## 🐳 Docker Support

To run backend via Docker:

```bash
cd backend
docker build -t task-backend .
docker run -p 5000:5000 \
  -e MONGO_URI=your-uri \
  -e JWT_SECRET=your-secret \
  task-backend
```

---

## 🧾 API Endpoints

### Auth
- `POST /register`
- `POST /login`

### Tasks
- `GET /tasks` – Get tasks (by role)
- `POST /tasks` – Create task
- `PUT /tasks/:id` – Update task
- `DELETE /tasks/:id` – Delete task

---

## 🧠 Tech Stack

- **Frontend**: React, Axios, TailwindCSS (or MUI)
- **Backend**: Express, MongoDB, JWT, bcrypt
- **Database**: MongoDB Atlas (cloud)
- **Deployment**: Vercel (frontend), Render (backend)

---

## 🛡️ Roles & Access

| Role   | Permissions                      |
|--------|----------------------------------|
| Admin  | Full access to all tasks         |
| User   | Create/view/edit own tasks only  |

---

## 📦 Future Improvements

- Pagination & filtering
- File uploads
- Profile image editing
- Unit & integration tests

---

Made with ❤️ using React + Express + MongoDB.
