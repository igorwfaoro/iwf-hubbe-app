
# IWF Rooms App

## Overview

This React-based web application features multiple rooms, some of which are "secure rooms" that can only be accessed by one person at a time. The backend, developed in Node.js, manages access to these rooms. The application allows for dynamic interaction with various rooms, each having its own characteristics. This document outlines setup instructions and provides an overview of the project's structure and technologies used.

## Technologies Used

- **Backend:** Node.js with Express and Prisma
- **Frontend:** Vite (React)
- **Database:** MongoDB

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB account and cluster

### Environment Variables

You need to set up environment variables for both the backend and frontend parts of the application.

#### Backend `.env`:

```env
DATABASE_URL="mongodb+srv://[db-user]:[password]@[cluster-url]/[db-name]?retryWrites=true&w=majority"
JWT_SECRET="[your-jwt-secret]"
HOST="localhost"
PORT=3333
```

Replace `[db-user]`, `[password]`, `[cluster-url]`, and `[db-name]` with your MongoDB details and `[your-jwt-secret]` with your secret key.

#### Frontend `.env`:

```env
VITE_APP_API_URL=http://localhost:3333
```

### Install and Run

#### Back
1. Navigate to the `back` directory and run `npm install`.
2. Run `npm run db:generate` to generate Prisma types and relations.
3. Run `npm run db:seed` to insert initial data in DB.
4. Start the backend server with `npm run dev`.

#### Front
1. Navigate to the `front` directory and run `npm install`.
4. Start the frontend server with `npm run dev`.

