# 📘 Refer & Credit System

A full-stack **MERN application** that allows users to register, refer friends, and earn credits when their referrals convert. Includes authentication, dashboard stats, and referral tracking.

---

## 🚀 Features

- User registration and login with JWT authentication  
- Unique referral code for each user  
- Track total referred, converted referrals, and earned credits  
- Dashboard showing:
  - Total Referred
  - Total Converted
  - Total Credits
  - List of referred users (name, email, status)
- Product purchase simulation that triggers referral conversion
- Secure Express API with TypeScript backend
- Fully responsive Next.js frontend

---

## 🧩 Tech Stack

**Frontend:**  
- Next.js 14 (App Router)  
- TypeScript  
- Tailwind CSS  

**Backend:**  
- Express.js + TypeScript  
- MongoDB + Mongoose  
- JWT for Auth  
- Bcrypt for password hashing  

---

## ⚙️ Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/sandeep-singh-bhandal/Refer_Credit_System.git
cd refer_credit_system

```

2. Install dependencies

   For backend

   ```bash
   cd backend
   npm install
   ```

   For frontend

   ```bash
   cd frontend
   npm install
   ```

3. Add .env file in the backend and frontend folder

   For Backend

   ```bash
   
   #Port for your backend
   PORT=5000

   #Your JWT Secret Key to encode and decode JWT token
   JWT_SECRET_KEY=your_jwt_secret

   #MONGO DB connection string to connect to the database
   MONGODB_URI=your_mongodb_connection_string

   ```

   For Frontend

   ```bash
   #Backend Url
   NEXT_PUBLIC_BACKEND_URL=your_backend_url
   ```

4. Run the project

   Run backend

   ```bash
   cd backend
   npm run dev
   ```

   Run frontend

   ```bash
   cd frontend
   npm run dev
   ```

