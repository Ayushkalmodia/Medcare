# Medicare

A full-stack healthcare management platform for patients and doctors. Book appointments, manage medical records, and connect with healthcare professionals—all in one place.

---

## 🚀 Features
- User authentication (JWT, role-based: patient/doctor)
- Patient dashboard: appointments, records, notifications
- Doctor dashboard: manage appointments, patients, notes
- Appointment booking with real-time doctor availability
- Medical records upload and management
- Responsive, modern UI (React + Tailwind)
- RESTful API (Node.js, Express, MongoDB)

---

## 🛠️ Tech Stack
- **Frontend:** React, React Router, Tailwind CSS, Axios
- **Backend:** Node.js, Express, Mongoose, JWT, Multer
- **Database:** MongoDB

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/medicare.git
cd medicare
```

### 2. Install dependencies
#### Server
```bash
cd server
npm install
```
#### Client
```bash
cd ../client
npm install
```

### 3. Environment Variables
Create a `.env` file in `server/config/` (or use `config.env`) with:
```
MONGO_URI=mongodb://localhost:27017/medicare
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
PORT=3001
```

### 4. Start the app
#### Start MongoDB (if not running)
```bash
mongod
```
#### Start the backend
```bash
cd server
npm run dev
```
#### Start the frontend
```bash
cd ../client
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3001/api/v1](http://localhost:3001/api/v1)

---

## 📚 API Endpoints (Sample)
- `POST   /api/v1/users/register` — Register user
- `POST   /api/v1/users/login` — Login
- `GET    /api/v1/doctors` — List doctors
- `GET    /api/v1/doctors/:id` — Doctor details
- `POST   /api/v1/appointments` — Book appointment
- `GET    /api/v1/appointments/me` — My appointments
- `GET    /api/v1/medical-records/me` — My medical records

---

## 🤝 Contributing
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/feature-name`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature/feature-name`)
5. Open a Pull Request

---

## 📄 License
MIT 
