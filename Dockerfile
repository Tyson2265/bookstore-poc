FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application
COPY . .

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "dev"]