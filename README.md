# WanderLust 🌍

WanderLust is a full-stack travel listing platform inspired by Airbnb, where users can explore destinations, create property listings, upload images, leave reviews, and manage their travel accommodations. The application provides authentication, image uploads, geolocation support, and review management.

## 🚀 Features

- User Authentication (Sign Up / Login / Logout)
- Create, Edit, and Delete Listings
- Upload Listing Images using Cloudinary
- Interactive Location Mapping
- Review and Rating System
- Flash Messages for User Feedback
- Session-Based Authentication
- Authorization & Route Protection
- MongoDB Database Integration
- Responsive User Interface using EJS Templates

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- EJS
- Bootstrap

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- Passport.js
- Passport Local Strategy
- Express Session

### Cloud Services
- Cloudinary (Image Storage)
- MapTiler API (Geocoding & Maps)

---

## 📂 Project Structure

```text
WanderLust/
│
├── controllers/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/
│   ├── css/
│   └── js/
│
├── views/
│   ├── listings/
│   ├── users/
│   ├── includes/
│   └── layouts/
│
├── utils/
│   ├── expressError.js
│   └── wrapAsync.js
│
├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
└── package.json
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Rohan-Revu/WanderLust.git
cd WanderLust
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_DB_ATLAS_URL=your_mongodb_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_maptiler_api_key
```

### 4. Start the Application

```bash
node app.js
```

The application will run on:

```text
http://localhost:8080
```

(Adjust the port if configured differently.)

---

## 🔑 Environment Variables

| Variable | Description |
|-----------|-------------|
| MONGO_DB_ATLAS_URL | MongoDB Atlas Connection String |
| SECRET | Express Session Secret |
| CLOUD_NAME | Cloudinary Cloud Name |
| CLOUD_API_KEY | Cloudinary API Key |
| CLOUD_API_SECRET | Cloudinary API Secret |
| MAP_TOKEN | MapTiler API Key |

---

## 📌 Core Functionalities

### Listings
- View all listings
- View listing details
- Create new listings
- Edit existing listings
- Delete listings

### Reviews
- Add reviews
- Delete reviews
- Rating support

### Authentication
- User Registration
- User Login
- User Logout
- Protected Routes

### Image Upload
- Cloudinary Integration
- Secure image storage

### Location Services
- Geocoding using MapTiler API
- Map display for listing locations

---

## 🔒 Security Features

- Password Hashing via Passport Local Mongoose
- Session-Based Authentication
- Route Authorization
- Server-Side Validation
- Protected CRUD Operations

---

## 📦 Main Dependencies

- Express.js
- MongoDB & Mongoose
- Passport.js
- Passport-Local-Mongoose
- Express Session
- Connect Mongo
- Cloudinary
- Multer
- Joi
- EJS
- Method Override

---

## 🌟 Future Enhancements

- Wishlist/Favorites Feature
- Booking System
- Payment Gateway Integration
- User Profiles
- Advanced Search & Filters
- Property Categories
- Admin Dashboard
- Email Notifications

---

LIVE LINK : [https://wanderlust-oeo1.onrender.com](url)
