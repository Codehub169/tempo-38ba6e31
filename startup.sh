#!/bin/bash

# Exit on error
set -e

# Navigate to backend directory and install dependencies
echo "Installing backend dependencies..."
cd backend
npm install

# Navigate to frontend directory, install dependencies, and build the project
echo "Installing frontend dependencies and building frontend..."
cd ../frontend
npm install
npm run build

# Navigate back to backend directory and start the server
echo "Starting the application server..."
cd ../backend

# Set the port for the backend server to 9000
export PORT=9000

npm start

echo "Application should now be running on http://localhost:9000"
