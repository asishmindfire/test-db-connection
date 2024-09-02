# Use the official Node.js image as the base image
FROM node:14

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Copy the startup script into the container
# COPY startup.sh /usr/local/bin/startup.sh

# Make the startup script executable
# RUN chmod +x /usr/local/bin/startup.sh

# Expose the port that the app runs on
EXPOSE 3000

# Set the startup script as the entry point
# ENTRYPOINT ["/usr/local/bin/startup.sh"]

# Command to run the application
CMD ["node", "app.js"]
