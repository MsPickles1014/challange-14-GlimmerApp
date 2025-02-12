# 🌟 GlimmerApp - Historical Events Finder

GlimmerApp is a full-stack web application that allows users to discover historical events that happened on a specific month and day using data from Wikipedia's On This Day API.

# 🚀 Features

🔍 Find historical events based on user input (MM/DD)

🌐 Fetch events dynamically from Wikimedia API

🎨 Styled with Tailwind CSS v3 for a modern UI

🔐 User authentication (login/register)

📦 Backend with Node.js, Express.js, PostgreSQL (Sequelize)

🌍 Deployed using Render

# 📂 Project Structure

📂 GlimmerApp/
│── 📂 client/  # Frontend (React + Vite + Tailwind)
│   ├── 📂 src/
│   │   ├── 📂 api/           # API handlers (auth, events)
│   │   ├── 📂 components/    # Reusable UI components
│   │   ├── 📂 pages/         # App pages (Login, Register, Event Finder)
│   │   ├── 📂 styles/        # Global styles
│   │   ├── main.tsx         # React entry point
│   │   ├── App.tsx          # Main App component
│   │   ├── index.css        # Tailwind styles
│   │
│   ├── package.json         # Frontend dependencies
│   ├── tailwind.config.js   # Tailwind configuration
│   ├── postcss.config.js    # PostCSS configuration
│   ├── vite.config.ts       # Vite configuration
│   ├── public/
│   │   ├── index.html       # Main HTML file
│
│── 📂 server/  # Backend (Node.js + Express + Sequelize + PostgreSQL)
│   ├── 📂 src/
│   │   ├── 📂 config/       # Database connection
│   │   ├── 📂 models/       # Sequelize models (User, Event)
│   │   ├── 📂 routes/       # Express routes (auth, events)
│   │   ├── 📂 middleware/   # Authentication middleware (JWT)
│   │   ├── server.ts       # Main server entry point
│
│   ├── package.json         # Backend dependencies
│   ├── .env                 # Environment variables
│
│── README.md                # Project documentation

# 🎨 Frontend (React + Vite + Tailwind CSS v3)

# 📌 Setup

1️⃣ Navigate to the client directory:

cd client

2️⃣ Install dependencies:

npm install

3️⃣ Start the frontend:

npm run dev

✅ The app will be running at http://localhost:3000/

📌 Environment Variables (.env)

Create a .env file in the client/ folder:

VITE_API_BASE_URL=http://localhost:3001/api

🛠️ Backend (Node.js + Express + PostgreSQL)

📌 Setup

1️⃣ Navigate to the server directory:

cd server

2️⃣ Install dependencies:

npm install

3️⃣ Setup database in .env file:

DB_URL=postgres://username:password@localhost:5432/glimmerapp
JWT_SECRET_KEY=your_secret_key

4️⃣ Start the backend:

npm run dev

✅ The backend will be running at http://localhost:3001/

🔄 API Endpoints

User Authentication

POST /api/users/register → Register new user

POST /api/users/login → Authenticate user

Historical Events

GET /api/events/:month/:day → Get historical events from Wikipedia API

# 🚀 Deployment

📌 Deploy Frontend (Vercel/Netlify)

1️⃣ Build the frontend:

npm run build

2️⃣ Deploy via Vercel or Netlify

📌 Deploy Backend (Render)

1️⃣ Push your repo to GitHub
2️⃣ Go to Render → Create a new Web Service
3️⃣ Set environment variables (DB_URL, JWT_SECRET_KEY)
4️⃣ Deploy! 🎉

# 👨‍💻 Contributors

Noela Deane, Ian Kessack, Kattie Merrick- Developer

🚀 Happy Coding! 🎉
