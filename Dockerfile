# ------- STAGE 1: Build React app -------
# RUN echo "Starting build Step 1"

# Node version to use
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /react-vite-build

# Copy package.json and package-lock.json to container
COPY package*.json /react-vite-build/

# Install dependencies
RUN npm install

# Copy everything from our local dir to the container image dir
COPY . /react-vite-build/

# Prod build
RUN npm run build

# ------- STAGE 2: Serve the built React app using Nginx -------
# ARG nginxFile
# RUN echo "Debug nginx filename...."
# RUN echo $nginxFile;
# Pull the official nginx base image
FROM nginx:alpine

# Copy the specified NGINX_FILENAME from the build argument to the nginx.conf location
COPY ./nginx-prod.conf /etc/nginx/nginx.conf

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove the default nginx static resources
RUN rm -rf ./*

# Copy the built app from the previous stage
COPY --from=builder /react-vite-build/dist/ .

# Port 8080 exposed
EXPOSE 8080

# Start nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
