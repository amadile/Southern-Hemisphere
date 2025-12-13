# Use Node.js 18 alpine image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership to non-root user
RUN chown -R nodejs:nodejs .
USER nodejs

# Expose port
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]