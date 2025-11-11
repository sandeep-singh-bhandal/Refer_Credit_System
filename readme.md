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

## API Endpoints

### User Routes

| Endpoint               | Method | Description                     | Body / Cookies                                                |
|------------------------|--------|---------------------------------|---------------------------------------------------------------|
| `/api/user/signup`      | POST   | Register a new user             | `{ "name": "Sunny", "email": "sunny@example.com", "password": "password123", "referralCode": "OPTIONAL" }` |
| `/api/user/login`       | POST   | Login a user                    | `{ "email": "sunny@example.com", "password": "password123" }` <br> Response sets JWT in `httpOnly` cookie |
| `/api/user/logout`      | POST   | Logout the user                 | Cookies cleared by server                                     |
| `/api/user/check-auth`  | POST   | Verify if user is authenticated | Requires valid JWT cookie                                      |
| `/api/user/get-dashboard` | GET  | Get dashboard stats             | Requires valid JWT cookie                                      |

### Purchase Routes

| Endpoint                     | Method | Description                     | Body / Cookies                                               |
|-------------------------------|--------|---------------------------------|---------------------------------------------------------------|
| `/api/purchase/buy`           | POST   | Create a purchase               | `{ "amount": 1000 }` <br> Requires valid JWT cookie           |
| `/api/purchase/get-all-purchases` | GET | Get all purchases               | Requires valid JWT cookie                                      |

**Note:** Axios requests from frontend automatically include cookies if `withCredentials: true` is set.


---

## 🏗️ Architecture & Data Flow

This application follows a **full-stack MERN architecture with TypeScript** and a cookie-based JWT authentication system. Here's how the components interact:

### 1. **Frontend (Next.js + TypeScript)**
- Provides UI for:
  - User registration & login
  - Dashboard display
  - Purchase simulation
- Communicates with the backend via **Axios** requests.
- JWT token is stored in an **httpOnly cookie** to secure authentication.
- Uses `withCredentials: true` in Axios to include cookies in requests.
- Pages:
  - `/` – Products
  - `/profile` – User dashboard
  - `/orders` – Purchase history
- Fetches dashboard and purchase data directly from backend APIs.

---

### 2. **Backend (Express + TypeScript)**
- Handles all API requests and business logic.
- Routes are divided into:
  - **User routes:** signup, login, logout, check-auth, get-dashboard
  - **Purchase routes:** buy, get-all-purchases
- Middleware:
  - `protectRoute` – Verifies JWT from cookie and adds `userId` to request.
- Controllers:
  - **UserController:** Manages user creation, authentication, and dashboard logic.
  - **PurchaseController:** Handles purchase creation and referral credit logic.
- Business Logic:
  - Referral credits are applied **only on first purchase**.
  - Dashboard shows total referred, converted referrals, credits, and list of referred users.
- Passwords are hashed using **bcrypt**.
- **MongoDB + Mongoose** used for database models.

---

### 3. **Database (MongoDB)**
- **User model**:
  - Stores user information, hashed password, referral code, credits, and referred users.
- **Referral model**:
  - Tracks relationships between referrer and referred users.
  - Fields: `referrerId`, `referredId`, `status` (`pending` | `converted`), `creditAwarded`, `convertedAt`.
- **Purchase model**:
  - Stores purchase history.
  - Fields: `userId`, `amount`, `isFirstPurchase`.

---

### 4. **Flow of a Referral Transaction**

1. **User Signup**
   - Optional referral code links user to a referrer.
   - Creates a `Referral` record with status `pending`.

2. **User First Purchase**
   - Backend checks if this is the first purchase.
   - If yes:
     - Updates corresponding `Referral` record:
       - `status = converted`
       - `creditAwarded = true`
       - `convertedAt = timestamp`
     - Increments credits for **both referrer and referred user**.

3. **Dashboard Display**
   - Fetches total referred, total converted, total credits, and referral code.
   - Fetches list of referred users with `name`, `email`, and `status`.

---

### 5. **Axios & Cookies**
- All frontend requests include cookies with `withCredentials: true`.
- Backend reads JWT from cookie to authenticate users.



