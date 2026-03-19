# 🍔 Bite Bills — Food Ordering Web App

Bite Bills Banner <img width="229" height="70" alt="Screenshot 2026-03-19 211637" src="https://github.com/user-attachments/assets/4cb39e7a-3385-4075-a252-ab2cd602a6db" />

> **Every bite tells a story — baked fresh, made with love, just for you.**

A modern full-stack food ordering web application built with React, Vite, Supabase, and Razorpay. Order your favorite food online with real-time order tracking and seamless payment integration.

---

## 🌐 Live Demo

👉 **[https://bite-bills-website.vercel.app](https://bite-bills-website.vercel.app)**

---

## 📸 Screenshots

### 🏠 Home Page
Home Page
<img width="1280" height="740" alt="Screenshot 2026-03-19 211209" src="https://github.com/user-attachments/assets/65b8eab3-2c2b-4df9-9362-4cc0bbdf5f30" />

### 🛒 Cart & Checkout
Checkout Page
<img width="2558" height="1479" alt="Screenshot 2026-03-19 211417" src="https://github.com/user-attachments/assets/c9656b51-f0b0-4afc-b1d4-e6ce81ee8f1c" />

### 👤 Profile & My Orders
Profile Page
<img width="2556" height="1479" alt="Screenshot 2026-03-19 211323" src="https://github.com/user-attachments/assets/a7721083-f39a-43df-8158-424ff41bb9df" />


### 🔐 Login / Signup
Login Page
<img width="2559" height="1473" alt="Screenshot 2026-03-19 211435" src="https://github.com/user-attachments/assets/154a3667-a5fd-426b-b723-95d1eaa4eeba" />


### 🛠️ Admin Dashboard
Admin Dashboard
<img width="2559" height="1477" alt="Screenshot 2026-03-19 211503" src="https://github.com/user-attachments/assets/7cdabf04-f8ce-4cfa-9084-75fb3aacc1a0" />

## ✨ Features

- 🔐 **Authentication** — Signup, Login, Logout via Supabase Auth
- 🍕 **Food Menu** — Browse products with filters and categories
- 🛒 **Cart System** — Add, remove, update items in cart
- 💳 **Payments** — Razorpay payment gateway integration
- 📦 **Order Tracking** — Real-time order status updates
- 👤 **User Profile** — View order history and manage account
- 🛠️ **Admin Panel** — Manage orders, products, and users
- 📱 **PWA Support** — Installable as a mobile app
- 🌙 **Dark Mode** — Theme support via next-themes
- 📍 **Delivery Map** — React Leaflet map integration
- 📲 **WhatsApp Orders** — Order via WhatsApp button

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend | React 18, Vite, TypeScript |
| Styling | Tailwind CSS, Framer Motion |
| UI Components | Radix UI, shadcn/ui, Lucide Icons |
| Backend | Supabase (PostgreSQL + Auth) |
| Payments | Razorpay |
| State Management | Zustand |
| Forms | React Hook Form + Zod |
| Routing | React Router DOM v6 |
| Maps | React Leaflet |
| Hosting | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- Supabase account
- Razorpay account

### 1. Clone the Repository
```bash
git clone https://github.com/Bhanuprakash2580/Bite-Bills-Website.git
cd Bite-Bills-Website
```

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Setup Environment Variables
Create a `.env` file in the root folder:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Setup Supabase Database
Go to your Supabase Dashboard → SQL Editor and run:
```sql
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS customer_name text,
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS address text,
ADD COLUMN IF NOT EXISTS delivery_date text,
ADD COLUMN IF NOT EXISTS items jsonb,
ADD COLUMN IF NOT EXISTS total numeric,
ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS payment_method text,
ADD COLUMN IF NOT EXISTS payment_id text,
ADD COLUMN IF NOT EXISTS order_source text DEFAULT 'website',
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS special_instructions text,
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);

NOTIFY pgrst, 'reload schema';
```

### 5. Run the App
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
bite-bills/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── admin/          # Admin dashboard components
│   │   ├── auth/           # Protected route components
│   │   ├── cart/           # Cart drawer & logic
│   │   ├── layout/         # Navbar, Footer
│   │   ├── products/       # Product filters & cards
│   │   └── ui/             # Reusable UI components
│   ├── pages/              # All page components
│   │   ├── HomePage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── LoginPage.jsx
│   │   └── SuccessPage.jsx
│   ├── lib/                # Supabase client, utilities
│   ├── constants/          # Product data, constants
│   └── main.jsx            # App entry point
├── vercel.json             # Vercel routing config
├── vite.config.ts          # Vite configuration
└── package.json
```

---

## 🌍 Deployment

This project is deployed on **Vercel**.

### Deploy Your Own
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Click Deploy ✅

---

## 🔐 Admin Access

To access the admin panel:
1. Go to `/admin` on your live site
2. Login with your admin credentials
3. Manage orders, products, and users

---

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Bhanuprakash**
- GitHub: [@Bhanuprakash2580](https://github.com/Bhanuprakash2580)
- Project: [Bite Bills Website](https://github.com/Bhanuprakash2580/Bite-Bills-Website)

---

⭐ **If you found this project helpful, please give it a star!** ⭐
