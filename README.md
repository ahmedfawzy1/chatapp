# Chat Application

This is a modern real-time chat application built using **React**, and **TypeScript**. It features a responsive UI with real-time messaging capabilities, user authentication, and a clean, modern design. The application uses Socket.IO for real-time communication and MongoDB for data persistence.

## Overview

The chat application is designed to provide a seamless messaging experience with features like real-time messaging, user authentication, and a modern UI built with Tailwind CSS and DaisyUI.

## Features

- **Real-time Messaging**:
  - Instant message delivery using Socket.IO
  - Message history and persistence
  - Online/offline status indicators
- **User Authentication**:
  - Secure login and registration
  - JWT-based authentication
  - Protected routes
- **User Interface**:
  - Responsive design with Tailwind CSS
  - Modern UI components with DaisyUI
  - Real-time notifications with React Hot Toast
- **State Management**:
  - Global state management with Zustand
  - Efficient data handling and updates

## Tech Stack

- **Frontend**:
  - Vite 6.2.0
  - React 19
  - TypeScript 5.7.2
  - Tailwind CSS 4.0.17
  - DaisyUI 5.0.9
- **Backend**:
  - Express.js
  - MongoDB with Mongoose
  - Socket.IO
- **Authentication**:
  - JWT (JSON Web Tokens)
  - Bcrypt for password hashing
- **Other Tools**:
  - Axios (HTTP client)
  - React Router DOM (routing)
  - React Hot Toast (notifications)
  - Zustand (state management)

## Installation

### Prerequisites

Ensure you have the following installed on your local machine:

- **Node.js** (v14 or above)
- **npm** or **yarn**

### Getting Started

1. Clone the repository (if applicable)

2. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:

   ```bash
   cd ../backend
   npm install
   ```

4. Set up environment variables:

   Backend (.env):

   ```
   MONGODB_URL=your_mongodb_connection_string
   PORT=5001
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   CLOUDINARY_CLOUD_NAME=CLOUD_NAME
   CLOUDINARY_API_KEY=API_KEY
   CLOUDINARY_API_SECRET=API_SECRET
   ```

5. Start the development servers:

   Frontend:

   ```bash
   cd frontend
   npm run dev
   ```

   Backend:

   ```bash
   cd backend
   npm run dev
   ```
