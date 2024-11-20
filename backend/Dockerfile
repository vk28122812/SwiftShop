# Base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy backend files
COPY . .

# Install backend dependencies
RUN npm install

# Expose the port
EXPOSE 5000

# Command to run the backend
CMD ["node", "server.js"]