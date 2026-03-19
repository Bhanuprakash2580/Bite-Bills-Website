# 🍪 Bite Bills

![Bite Bills Banner](https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1200&q=80)

**Bite Bills** is a modern, premium bakery e-commerce platform built with React, Vite, and Supabase. It allows customers to browse fresh bakes, manage their cart, track orders in real-time, and securely check out using multiple payment methods.

🌍 **Live Website:** [https://bite-bills-website.vercel.app/](https://bite-bills-website.vercel.app/)

---

## ✨ Features

### 🛒 Customer Experience
- **Dynamic Shop:** Browse completely categorized treats (Cookies, Cupcakes, Brownies, Toppings, Gifts) with high-quality images.
- **Smart Checkout:** Adaptive checkout flow offering **Razorpay (Card/UPI)**, **WhatsApp Ordering**, or **Cash on Delivery (COD)**.
- **User Profiles:** Secure authentication where users can manage their **Address Book**, view **Order History**, and see a visual **Order Status Tracker**.
- **Real-Time Data:** order statuses update instantly without refreshing the page thanks to Supabase Realtime subscriptions.

### 🔐 Admin Dashboard
- **Secure Access:** Dedicated dashboard for administrators (accessed via `/admin`).
- **Order Management:** View robust details of all incoming orders including full addresses, calculated totals, and active status tracking (`pending` ➔ `preparing` ➔ `dispatch` ➔ `delivered`).
- **Manual Orders:** Add custom orders taken offline or via Instagram directly into the central database.
- **Quick Contact:** 1-click WhatsApp and Phone call integration directly on the order cards.

---

## 🛠️ Tech Stack

- **Frontend:** React.js 18, Vite
- **Styling:** Tailwind CSS, Framer Motion (for animations), Lucide React (icons)
- **State Management:** Zustand (Cart & Auth persistence)
- **Backend & Database:** Supabase (PostgreSQL, Auth, Realtime APIs)
- **Payments:** Razorpay integration
- **Routing:** React Router DOM
- **Deployment:** Vercel

---

## 📸 Screenshots

### Shop & Products
*(You can replace these placeholders with your actual app screenshots later)*
![Shop Page](https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80)

### Checkout & Payments
![Checkout Flow](https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80) 

---

## 🚀 Getting Started Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js installed (v18+)
- A Supabase Project
- A Razorpay Account (for exact keys)

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/Bite-Bills-Website.git
   cd Bite-Bills-Website
   ```

2. **Install NPM packages**
   ```sh
   npm install
   ```

3. **Set up your environment variables**
   Create a `.env` file in the root directory and add:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_RAZORPAY_KEY_ID=your_razorpay_test_key
   VITE_ADMIN_EMAIL=your_admin_email@example.com
   ```

4. **Run the development server**
   ```sh
   npm run dev
   ```
   The site will be available at `http://localhost:5173` (or 5174).

---

## 🗄️ Database Schema Setup (Supabase)

If you are setting this up on a fresh database, run the provided script in your Supabase SQL Editor:
- Open `fix_orders_table.sql` and run it to automatically generate the `orders` table.
- Alternatively, you can run the full `supabase_setup.sql` to initialize `profiles`, `products`, and enable Row Level Security (RLS).

---

## 💡 Important Notes
- **Razorpay Sandbox:** To test payments, ensure your Razorpay account is in "Test Mode" and use standard test cards.
- **Vercel Deployment:** When deploying, remember to explicitly copy all your `.env` variables into the Vercel project settings so your APIs function correctly.

---

> Crafted by **Bhanuprakash** — Elevating the modern bakery experience.
