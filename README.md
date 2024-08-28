# Ticket Management System API

This project is a comprehensive Ticket Management System API that allows users to create tickets, assign users to tickets, and view ticket analytics.

## Features

- User registration and authentication
- Create and manage tickets
- Assign users to tickets
- View ticket details and history
- Get ticket analytics

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (comes with Node.js)
- PostgreSQL (v12 or later)

## Installation

1. Clone the repository: `git clone https://github.com/me-kirtangajjar/ticket-management-system.git`

2. Install the dependencies: `npm i`

3. Set up the environment variables:
Create a `.env` file in the root directory and add the following:

```
PORT = 3000
DATABASE_URL = postgresql://username:password@localhost:5432/ticket_management_db
JWT_SECRET = your_jwt_secret_key
```

Replace `username`, `password`, and `ticket_management_db` with your PostgreSQL credentials and desired database name.

4. Create the database: `ticket_management_db`

5. Initialize the database schema: `node initDb.js`

## Usage

1. Start the server: `npm start`

2. The API will be available at `http://localhost:3000/api`

## API Endpoints

### User Management
- `POST /api/users`: Register a new user
- `POST /api/auth/login`: User login

### Ticket Management
- `POST /api/ticket`: Create a new ticket
- `POST /api/tickets/:ticketId/assign`: Assign a user to a ticket
- `GET /api/tickets/:ticketId`: Get ticket details
- `GET /api/tickets/analytics`: Get ticket history and analytics
- `GET /api/dashboard/analytics`: Get dashboard analytics