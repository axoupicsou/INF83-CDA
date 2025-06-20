# Use the official Node.js LTS image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install


# Copy the rest of the application code
COPY . .

# Expose the application port (change if needed)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]