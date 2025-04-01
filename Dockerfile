# Use Node.js base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript code (optional, remove if not using TypeScript)
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/app.js"]
