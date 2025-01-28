# Use Node.js runtime as a parent image
FROM node:22
# Set working directory
WORKDIR /app
# Copy package.json, package-lock.json, and tsconfig.json
COPY package*.json tsconfig.json ./
# Install dependencies
RUN npm install
# Copy the rest of the project files
COPY . .
# Expose port 3000 (default for React development server)
EXPOSE 3000
# Run the development server
CMD ["npm", "run", "dev"]

# run 
# docker run -e REACT_APP_API_URL=http://localhost:5000 -p 3000:3000 saftey-data-react