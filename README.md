🛒 ShopNow — Full Stack MERN E-Commerce Platform

A production-style full stack e-commerce application built using the MERN stack with secure authentication, dynamic cart management, Stripe payment integration, admin dashboard, and complete order flow.

This project was built from scratch with focus on understanding real-world full stack architecture, API design, authentication flow, MongoDB operations, state management, and deployment practices instead of only building frontend UI.

🛒 Live Demo

Frontend  
[Live Website](https://your-frontend-url.vercel.app)

Admin Panel  
[Admin Dashboard](https://your-admin-url.vercel.app)

Backend API  
[Backend Server](https://your-backend-url.onrender.com)

---

✨ Core Features

👤 Authentication & Authorization

- JWT based authentication
- Secure login/register system
- Password hashing using bcrypt
- Persistent login using localStorage
- Token verification middleware
- Protected routes

🛍️ Product System

- Dynamic product listing
- Product detail pages
- Category filtering
- Search functionality
- Product image gallery
- Size selection support
- Responsive product collections

🛒 Cart System

- Add to cart functionality
- Quantity update system
- Remove specific product variant from cart
- Cart persistence in MongoDB
- Dynamic cart total calculation
- Variant-based cart handling

💳 Stripe Payment Integration

- Stripe Checkout integration
- Payment success flow
- Payment cancel flow
- Order creation after successful payment
- Secure backend payment session generation

📦 Order Management

- User order history
- Order placement flow
- Backend order storage
- Payment status handling

🛠️ Admin Dashboard

- Add new products
- Upload product images
- Manage products
- View orders
- Product inventory management

☁️ Cloudinary Integration

- Cloud image upload support
- Optimized image hosting
- Dynamic image rendering

---

🧠 Technical Concepts Implemented

- REST APIs
- JWT Authentication
- Express Middleware
- MongoDB nested updates
- Array object manipulation in MongoDB
- React Context API
- State synchronization
- Protected routing
- Async request handling
- Form management
- Stripe checkout sessions
- File uploads with multer
- Cloudinary integration
- Environment variable management
- Full stack deployment flow

---

🏗️ Tech Stack

Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer

External Services

- Stripe
- Cloudinary
- MongoDB Atlas

---

📂 Project Architecture

```txt
ShopNow/
│
├── frontend/        → User website
├── admin/           → Admin dashboard
├── Backend/         → Express backend API
```

---

🔐 Environment Variables

Backend `.env`

```env
PORT=
MONGODB_URI=
JWT_SECRET=

CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=

STRIPE_SECRET_KEY=

FRONTEND_URL=
ADMIN_URL=
```

Frontend `.env`

```env
VITE_BACKEND_URL=
VITE_ADMIN_URL=
VITE_STRIPE_PUBLISHABLE_KEY=
```

---

⚙️ Installation

Clone Repository

```bash
git clone https://github.com/yourusername/ShopNow.git
```

Backend Setup

```bash
cd Backend
npm install
npm run server
```

Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Admin Setup

```bash
cd admin
npm install
npm run dev
```

---

🔥 Major Challenges Solved During Development

- Managing JWT authentication lifecycle
- Handling async React state updates
- MongoDB nested array updates using `$elemMatch`
- Variant-specific cart operations
- Stripe payment verification flow
- Global state synchronization using Context API
- Persistent authentication across refresh
- Deployment environment configuration
- CORS configuration between frontend/admin/backend

---

📈 What I Learned From This Project

- Real-world MERN architecture
- Backend API structuring
- Authentication systems
- Database relationship handling
- Production deployment workflow
- State management challenges
- Payment gateway integration
- Debugging full stack applications

---

🚀 Future Improvements

- Redis caching
- Product reviews & ratings
- Wishlist system
- Coupon system
- Email notifications
- Advanced admin analytics
- Inventory tracking
- Pagination & optimization
- Role-based authorization
- Webhook-based Stripe verification

---

👨‍💻 Author

Rishi

---

⭐ Final Note

This project was built not just as a frontend showcase, but as a complete full stack application focused on understanding production-level concepts, backend architecture, authentication, database manipulation, and real-world deployment challenges.
