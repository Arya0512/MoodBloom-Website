🌼 MoodBloom – Random Act of Kindness System

MoodBloom is a heart-warming full-stack web application that helps users improve their day through simple, meaningful tasks based on their current mood. Users can save tasks, complete them, and build a personal history of positivity.

✨ Features
🔐 User Authentication

User Signup & Login

Secure password hashing

JWT-based authentication

Personalized user dashboard

😊 Mood-Based Task Suggestions

User selects their current mood

App assigns a positive task based on the selected mood

Users can save tasks to their profile

#Task Management

View assigned task

Save task with a single click

Track all pending tasks

✔️ Task Completion System

Mark tasks as completed

Completed tasks move to History

Users can delete tasks from history anytime

👤 User Profile

Includes:

Username

Email

Selected Mood

Pending Tasks

Completed Task History

🧰 Tech Stack
Frontend

React / Next.js

Tailwind CSS / CSS Framework

Backend

Node.js

Express.js

Database

MongoDB + Mongoose

📁 Project Structure
MoodBloom/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
└── README.md

🚀 Getting Started
1️⃣ Clone the Repository
git clonne https://github.com/Arya0512/MoodBloom-Website
cd moodbloom

🔧 Backend Setup
Install Dependencies
cd backend
npm install

Create .env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Start Server
npm start

🎨 Frontend Setup
Install Dependencies
cd frontend
npm install

Start Development Server
npm run dev

📌 API Endpoints (Quick View)
Auth

POST /api/auth/signup – User Signup

POST /api/auth/login – User Login

Tasks & Mood

POST /api/mood/select – Select mood

GET /api/task/:mood – Get task based on mood

POST /api/task/save – Save task

POST /api/task/done – Mark task completed

DELETE /api/task/:id – Delete completed task

🎯 Future Improvements

Daily positivity streak tracking

Reward badges

Admin panel to manage and add tasks

AI-based mood analysis

  🤝 Contributing

Contributions are always welcome!
Open an issue or submit a pull request to improve the project.

📄 License

This project is licensed under the MIT License.
