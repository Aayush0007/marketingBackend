# Use official Node.js image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose port
EXPOSE 3001

# Start the server
CMD ["node", "src/server.js"]
