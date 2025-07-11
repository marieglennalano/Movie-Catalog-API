# 🎬 Movie Catalog API

A Node.js + Express REST API for managing a movie catalog with user authentication, admin-only movie management, and user-generated comments. Built with MongoDB and secured using JWT.

---

## 🚀 Features

### 👤 User Authentication
- Register with email and password
- Login and receive a JWT token
- `isAdmin` flag for role-based access

### 🎞️ Movie Management
- Admins can:
  - Add new movies
  - Edit movie details
  - Delete movies
- All users can:
  - View all movies
  - View movie details by ID

### 💬 Comments
- Authenticated users can:
  - Add comments to any movie
  - View comments for a movie

---

## 📦 Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT
- **Environment:** CORS, Postman for testing

---

## 📁 Folder Structure
movie-catalog-api/
├── models/
│ ├── User.js
│ └── Movie.js
├── controllers/
│ ├── user.js
│ ├── movie.js
│ └── comment.js
├── routes/
│ ├── user.js
│ ├── movie.js
│ └── comment.js
├── index.js
├── auth.js
└── package.json

---

## 📌 API Endpoints

### 👤 Auth Routes
| Method | Endpoint        | Description         |
|--------|------------------|---------------------|
| POST   | `/users/register` | Register new user   |
| POST   | `/users/login`    | User login          |
| GET    | `/users/details`  | Get user profile    |

### 🎬 Movie Routes
| Method | Endpoint                | Description                  |
|--------|--------------------------|------------------------------|
| POST   | `/movies/addMovie`       | Add movie (Admin only)       |
| PUT    | `/movies/updateMovie/:id`| Update movie (Admin only)    |
| DELETE | `/movies/deleteMovie/:id`| Delete movie (Admin only)    |
| GET    | `/movies/getMovies`      | Get all movies               |
| GET    | `/movies/getMovie/:id`   | Get single movie by ID       |

### 💬 Comment Routes
| Method | Endpoint                       | Description              |
|--------|---------------------------------|--------------------------|
| PATCH  | `/movies/addComment/:movieId`   | Add comment to movie     |
| GET    | `/movies/getComments/:movieId`  | Get all comments for movie |

---

## 🔐 Sample JWT Auth (Postman)
1. Login to receive a token.
2. Set this token in your Postman headers:

---

## 🧪 Testing
Use [Postman](https://www.postman.com/) or any API client. All endpoints are tested for:
- Role restrictions
- JWT validation
- Data validation and error handling

---

## 📄 License

MIT © 2025  
Author: Marie Glenn Alano

