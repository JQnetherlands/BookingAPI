# 🏡 Booking Management API

A **Node.js + Express REST API** for managing bookings, properties, hosts, reviews, and users.  
Built with a focus on **clean architecture, service-layer separation, JWT authentication, and maintainability**, this API powers booking and property management applications.

---

# 🚀 Live API

Base URL: *https://bookingapi-production-d45d.up.railway.app/*

[https://bookingapi-production-d45d.up.railway.app/](https://bookingapi-production-d45d.up.railway.app/)

---

# 🧠 Project Goal

This project was developed for my **portfolio** to demonstrate real-world backend engineering practices.  
The goal was to design a **scalable, maintainable, and production-ready backend**, capable of handling bookings, properties, users, and associated data.

Key goals:

- Clean, modular architecture  
- Reusable business logic (service layer)  
- Centralized error handling  
- JWT-based authentication for protected routes  
- Scalable folder structure  
- Clear, predictable API responses  

---

# ✨ Features

- Bookings CRUD (protected write operations)  
- Properties CRUD (protected write operations)  
- Hosts CRUD (protected write operations)  
- Reviews CRUD (protected write operations)  
- Users CRUD (protected write operations)  
- JWT-based Authentication  

---

# 🛠 Tech Stack

- Node.js  
- Express  
- Prisma (ORM)  
- PostgreSQL (Railway)  
- JWT authentication  
- REST API principles  
- Postman for testing  

---

# 📁 Project Structure

```text
src/
├── data/
│   ├── amenities.json
│   ├── bookings.json
│   ├── hosts.json
│   ├── properties.json
│   ├── reviews.json
│   └── users.json
├── generated/
│   └── prisma/                 # auto-generated Prisma client
├── lib/
│   └── prisma.js               # Prisma client wrapper
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   ├── logMiddleware.js
│   └── NotFoundErrorHandler.js
├── routes/
│   ├── bookings.js
│   ├── hosts.js
│   ├── login.js
│   ├── properties.js
│   ├── reviews.js
│   └── users.js
├── services/
│   ├── bookings/
│   │   ├── createBooking.js
│   │   ├── deleteBooking.js
│   │   ├── getBookingById.js
│   │   ├── getBookings.js
│   │   └── updateBooking.js
│   ├── hosts/
│   │   ├── createHost.js
│   │   ├── deleteHost.js
│   │   ├── getHostById.js
│   │   ├── getHosts.js
│   │   └── updateHost.js
│   ├── properties/
│   │   ├── createProperty.js
│   │   ├── deleteProperty.js
│   │   ├── getProperties.js
│   │   ├── getPropertyById.js
│   │   └── updateProperty.js
│   ├── reviews/
│   │   ├── createReview.js
│   │   ├── deleteReview.js
│   │   ├── getReviewById.js
│   │   ├── getReviews.js
│   │   └── updateReview.js
│   └── users/
│       ├── createUser.js
│       ├── deleteUser.js
│       ├── getUserById.js
│       ├── getUsers.js
│       └── updateUser.js
├── errors/
│   ├── BadRequestError.js
│   └── NotFoundError.js
├── utils/
│   ├── bookingHelpers.js
│   ├── calculateNights.js
│   ├── hostHelper.js
│   ├── logs.js
│   ├── reviewHelpers.js
│   ├── toNumber.js
│   └── validate.js
├── index.js
└── instrument.mjs

prisma/
├── schema.prisma
├── migrations/
└── seed.js
````

---

# 🔐 Authentication Flow

1. User logs in via `/login`
2. Server validates credentials from users data
3. Server returns a JWT token
4. Client includes token in `Authorization` header for protected routes
5. Middleware validates token and grants access

**Protected routes include:**

* Create / Update / Delete Bookings
* Create / Update / Delete Properties
* Create / Update / Delete Hosts
* Create / Update / Delete Reviews
* Create / Update / Delete Users

**Header example:**

```text
Authorization: Bearer <JWT_TOKEN>
```

---

# 📡 API Endpoints

### **Auth**

| Method | Endpoint | Description             | Protected |
| ------ | -------- | ----------------------- | --------- |
| POST   | /login   | User login, returns JWT | ❌         |

---

### **Bookings**

| Method | Endpoint      | Description       | Protected |
| ------ | ------------- | ----------------- | --------- |
| GET    | /bookings     | Get all bookings  | ❌         |
| GET    | /bookings/:id | Get booking by ID | ❌         |
| POST   | /bookings     | Create booking    | ✅         |
| PUT    | /bookings/:id | Update booking    | ✅         |
| DELETE | /bookings/:id | Delete booking    | ✅         |

---

### **Properties**

| Method | Endpoint        | Description        | Protected |
| ------ | --------------- | ------------------ | --------- |
| GET    | /properties     | Get all properties | ❌         |
| GET    | /properties/:id | Get property by ID | ❌         |
| POST   | /properties     | Create property    | ✅         |
| PUT    | /properties/:id | Update property    | ✅         |
| DELETE | /properties/:id | Delete property    | ✅         |

---

### **Hosts**

| Method | Endpoint   | Description    | Protected |
| ------ | ---------- | -------------- | --------- |
| GET    | /hosts     | Get all hosts  | ❌         |
| GET    | /hosts/:id | Get host by ID | ❌         |
| POST   | /hosts     | Create host    | ✅         |
| PUT    | /hosts/:id | Update host    | ✅         |
| DELETE | /hosts/:id | Delete host    | ✅         |

---

### **Reviews**

| Method | Endpoint     | Description      | Protected |
| ------ | ------------ | ---------------- | --------- |
| GET    | /reviews     | Get all reviews  | ❌         |
| GET    | /reviews/:id | Get review by ID | ❌         |
| POST   | /reviews     | Create review    | ✅         |
| PUT    | /reviews/:id | Update review    | ✅         |
| DELETE | /reviews/:id | Delete review    | ✅         |

---

### **Users**

| Method | Endpoint   | Description    | Protected |
| ------ | ---------- | -------------- | --------- |
| GET    | /users     | Get all users  | ❌         |
| GET    | /users/:id | Get user by ID | ❌         |
| POST   | /users     | Create user    | ✅         |
| PUT    | /users/:id | Update user    | ✅         |
| DELETE | /users/:id | Delete user    | ✅         |

---

# 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/JQnetherlands/BackEndProyectAssignment
cd BackEndProyectAssignment
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file (only need to set your secret key):

```env
AUTH_SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:password@hostname:port/dbname
```

4. Start the development server:

```bash
npm run dev
```

---

# 🧩 Architecture Highlights

## Service Layer

All business logic is separated into:

```
src/services/
```

Benefits:

* reusable logic
* cleaner routes
* easier testing
* scalable structure

---

## Middleware System

* `auth.js` → protects routes
* `errorHandler.js` → centralizes errors
* `logMiddleware.js` → logs requests
* `NotFoundErrorHandler.js` → handles 404

---

## Prisma ORM

Database access is handled via Prisma:

```
src/lib/prisma.js
```

* type-safe queries
* easy migrations
* scalable DB layer

---

# 🔮 Future Improvements

* Input validation with Zod or Joi
* Role-based authorization
* Pagination & filtering for lists
* Rate limiting & security headers
* Unit and integration testing
* Refresh token support for JWT

---

# 📚 What I Learned

* Service-layer architecture for Node.js APIs
* JWT authentication and protected routes
* Middleware patterns and centralized error handling
* Structuring a scalable REST API
* Integrating Prisma ORM with SQLite/PostgreSQL

---

# 👤 Author

**Jhonny Quebrada**

GitHub: [https://github.com/JQnetherlands](https://github.com/JQnetherlands)
Portfolio: *(add your link here)*

---

# 📄 License

MIT License


