<h1 align="center">E-Store Frontend Application</h1>
<p align="center">
  <img src="https://img.shields.io/badge/react-v18.2.0-blue" alt="react version"/>
  <img src="https://img.shields.io/badge/firebase-v9.0.0-orange" alt="firebase version"/>
  <img src="https://img.shields.io/badge/vite-v4.0.0-yellow" alt="vite version"/>
</p>

<p align="center">
  This is the frontend web application for the E-Shop. Browse and choose your products with ease.
</p>

---

## ✨ Features

- Browse products with pagination, search, sorting, and filtering options.
- Firebase integration for sign-up and sign-in.
- Toast notifications for real-time user actions.
- Fully responsive UI compatible with desktops, tablets, and mobile devices.

---

## 🛠️ How to Clone and Run the Project Locally

1. **Clone the repository:**
   - Clone both the **client** and **server** sides. Open your terminal and type:
     ```bash
     git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
     ```

2. **Open files in VS Code:**
   - After opening the **client-side** and **server-side** files in VS Code, install the npm dependencies:
     ```bash
     npm install
     ```

3. **Firebase setup:**
   - Configure Firebase environment variables by creating a `.env.local` file in the root directory. Add the following variables:
     ```plaintext
       VITE_APIKEY=your_firebase_apikey
       VITE_AUTHDOMAIN=your_firebase_authdomain
       VITE_PROJECTID=your_firebase_projectid
       VITE_STORAGEBUCKET=your_firebase_storagebucket
       VITE_MESSAGINGSENDERID=your_firebase_messagingsenderid
       VITE_APPID=your_firebase_appid
     ```
     Replace `VITE_API_URL` with your server URL, e.g., `VITE_API_URL='http://localhost:3000'`.

4. **Run locally:**
   - Open your VS Code terminal, navigate to the client directory, and run:
     ```bash
     npm run dev
     ```
   - This will start the client-side application locally.

---
