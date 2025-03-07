````
# Suupala

## Description
This project is a web application that allows users to register, log in, and manage their items. The main functionality of the project is to generate recipes using AI based on the items in the user's fridge.

## Features
- User registration and login
- Add and remove items from the user's list
- Generate recipes using items in the user's list

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ahmedeleven/suupala-backend.git
````

2. Navigate to the project directory:
   ```bash
   cd suupala
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=3000
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   GEMINI_API_KEY=your-gemini-api-key
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```
2. The server will be running on `http://localhost:3000`.

## API Endpoints

### Auth

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Log in a user

### User

- `PUT /api/users/:userId`: Update user information (requires authentication)
- `POST /api/users/:userId/items`: Add an item to the user's list (requires authentication)
- `DELETE /api/users/:userId/items`: Remove an item from the user's list (requires authentication)

### Recipes

- `POST /api/recipes/generate`: Generate a recipe using items in the user's list (requires authentication)

## Middleware

### authMiddleware.js

- `authMiddleware`: Validates the JWT token and sets `req.user` to the authenticated user's ID.
- `isCurrentUser`: Checks if the authenticated user matches the user ID in the request parameters.

### Example Usage in Routes

```javascript
import express from "express";
import { authMiddleware, isCurrentUser } from "../middleware/authMiddleware.js";
import { addItem, removeItem } from "../controllers/usersController.js";

const router = express.Router();

router.post("/users/:userId/items", authMiddleware, isCurrentUser, addItem);
router.delete(
  "/users/:userId/items",
  authMiddleware,
  isCurrentUser,
  removeItem
);

export default router;
```

## License

This project is licensed under the MIT License.

```

```
