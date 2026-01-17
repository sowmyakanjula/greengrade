# 🌿 GreenGrade

GreenGrade is a full-stack web application that analyzes plant-related images and provides a clean grading report including **health score, grade, growth stage, and care tips**.

Users can upload an image of a **Plant / Tree / Flower / Seed**, and the system processes it using a backend API.

---

## 🚀 Live Demo

- **Frontend (Vercel):** https://greengrade.vercel.app  
- **Backend (Render):** https://greengrade.onrender.com  

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- JavaScript
- Deployed on **Vercel**

### Backend
- FastAPI (Python)
- Uvicorn
- REST API
- Deployed on **Render**

---

## 📂 Project Structure

```text
greengrade/
├── frontend/        # React + Vite frontend
│   ├── src/
│   │   ├── services/api.js
│   │   └── App.jsx
│   └── package.json
│
├── backend/         # FastAPI backend
│   ├── app/
│   │   └── main.py
│   ├── requirements.txt
│   └── render.yaml
│
└── README.md
