# Task Management Application

A full-stack task management application built with Node.js, Express, MongoDB, and React. Users can create, manage, and track their tasks with authentication, filtering, and dashboard statistics.

## Features

### Core Features
- **User Authentication**: Registration, login, logout with JWT tokens
- **Task Management**: Create, read, update, delete tasks
- **Task Filtering**: Filter by status and priority
- **Search**: Search tasks by title or description
- **Dashboard**: Task statistics and breakdowns
- **Responsive Design**: Mobile-friendly interface

### Task Properties
- Title (required)
- Description
- Priority (Low/Medium/High)
- Status (Todo/In Progress/Completed)
- Due Date
- User association

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- express-validator for input validation
- CORS enabled

### Frontend
- React 18
- React Router for navigation
- Redux for state management
- Axios for API calls
- Tailwind CSS for styling
- Vite for build tooling

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/imvaibhav99/todo-assignment.git
cd todo-assignment
```

### 2. Backend Setup
```bash
cd "backend-auth copy"
npm install
```

### 3. Frontend Setup
```bash
cd "../frontend-auth copy"
npm install
```

## Environment Variables

### Backend Environment Variables
Create a `.env` file in the `backend-auth copy` directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/todo-app
# or for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/todo-app

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random

# Server Configuration
PORT=9000
NODE_ENV=development

# CORS Configuration
CLIENT_URL=http://localhost:5173
```

**Important**: Replace `your-super-secret-jwt-key-here-make-it-long-and-random` with a strong, random secret key.

## Running the Application

### 1. Start MongoDB
Make sure MongoDB is running on your system:
- **Local MongoDB**: Start MongoDB service
- **MongoDB Atlas**: Ensure your cluster is accessible

### 2. Start Backend Server
```bash
cd "backend-auth copy"
npm start
# or for development with auto-restart
npm run dev
```
Backend will run on `http://localhost:9000`

### 3. Start Frontend Development Server
```bash
cd "../frontend-auth copy"
npm run dev
```
Frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/v1/user/signup` - Register new user
- `POST /api/v1/user/login` - Login user
- `POST /api/v1/user/logout` - Logout user
- `GET /api/v1/user/current-user` - Get current user profile
- `PATCH /api/v1/user/update-user` - Update user profile

### Tasks (Protected Routes)
- `GET /api/v1/tasks` - Get all tasks (with filtering)
- `GET /api/v1/tasks/:id` - Get single task
- `POST /api/v1/tasks` - Create new task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task
- `GET /api/v1/tasks/stats` - Get task statistics

### Query Parameters for Task List
- `status` - Filter by status (Todo, In Progress, Completed)
- `priority` - Filter by priority (Low, Medium, High)
- `search` - Search by title or description
- `page` - Page number for pagination
- `limit` - Number of items per page

## Project Structure

```
todo-assignment/
├── backend-auth copy/
│   ├── controllers/
│   │   ├── task.controller.js
│   │   └── user.controller.js
│   ├── database/
│   │   └── db.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── validation.middleware.js
│   ├── models/
│   │   ├── task.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── task.route.js
│   │   └── user.route.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── index.js
│   └── package.json
├── frontend-auth copy/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard/
│   │   │   ├── Tasks/
│   │   │   ├── Body.jsx
│   │   │   ├── Footers.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## Assumptions Made

1. **Database**: MongoDB is installed and running locally, or MongoDB Atlas cluster is accessible
2. **Ports**: Backend runs on port 9000, frontend on port 5173
3. **Authentication**: JWT tokens are stored in HTTP-only cookies
4. **CORS**: Frontend and backend are on different ports during development
5. **User Experience**: Users expect real-time updates when navigating between pages

## Development Notes

- Backend uses ES6 modules (import/export)
- Frontend uses React 18 with functional components and hooks
- Authentication is cookie-based with JWT tokens
- All task routes are protected and require authentication
- Input validation is handled on both frontend and backend
- Error handling includes user-friendly messages

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env` file
   - Verify network access for MongoDB Atlas

2. **CORS Issues**
   - Ensure `CLIENT_URL` in backend `.env` matches frontend URL
   - Check that credentials are enabled in axios requests

3. **Authentication Issues**
   - Clear browser cookies and try logging in again
   - Check JWT_SECRET is set in backend `.env`

4. **Port Already in Use**
   - Change PORT in backend `.env` file
   - Update CLIENT_URL accordingly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
