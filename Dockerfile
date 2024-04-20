# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3200

ENV FRONT_END_DOMAIN "https://notomatic-front.vercel.app/"
ENV DATABASE_URL "cluster0.4zx65dt.mongodb.net/notomatic"
ENV DATABASE_USERNAME "To be defined"
ENV DATABASE_PASSWORD "To be defined"
ENV TOKEN_SECRET "To be defined"

# Command to run the application
CMD ["node", "app.js"]