# Project Overview

This is a full-stack web application built with Express, React, Node.js and TypeScript. The project is structured as a monorepo with a `client` directory for the React frontend and a `server` directory for the Express backend.

## Technologies Used

*   **Frontend:**
    *   React
    *   Vite
    *   TypeScript
    *   ESLint
*   **Backend:**
    *   Express.js
    *   TypeScript
    *   Node.js
    *   Nodemon

## Architecture

The project is divided into two main parts:

*   **Client:** A React application built with Vite that serves as the user interface. It fetches data from the backend API.
*   **Server:** An Express.js application that provides a RESTful API for the client.

# Building and Running

## Prerequisites

*   Node.js and npm installed.

## Development

To run the application in development mode, run the following command from the root directory:

```bash
npm run dev
```

This will start both the client and the server in development mode with hot-reloading.

*   The client will be available at `http://localhost:5173`
*   The server will be available at `http://localhost:5000`

## Production

To build the application for production, run the following command from the root directory:

```bash
npm run build
```

This will create a `dist` folder in both the `client` and `server` directories.

To run the application in production mode, run the following command from the root directory:

```bash
npm start
```

# Development Conventions

## Coding Style

*   The project uses ESLint to enforce a consistent coding style.
*   TypeScript is used for static typing.

## Testing

*   There are no tests configured for this project yet.
