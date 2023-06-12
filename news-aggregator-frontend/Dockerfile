# Base image
FROM node:alpine

# Set working directory
WORKDIR /app/news-aggregator-frontend

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Set the command to run the app
CMD ["npm", "start"]

# Expose the port
EXPOSE 3000
