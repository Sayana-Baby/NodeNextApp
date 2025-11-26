# Stage 1: Builder - Install dependencies and build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Next.js application for production
RUN npm run build

# Stage 2: Production - Create a small, secure image with only the built app
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Create a non-root user 'nextjs' and a group 'nextjs'
RUN addgroup -g 1001 -S nextjs && \
    adduser -S nextjs -u 1001

# Copy built assets from the builder stage
# The standalone output bundles all necessary files, including the .next/static and public folders.
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Change the owner of the application files to the non-root user
RUN chown -R nextjs:nextjs /app

# Switch to the non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Set the production host and port
ENV HOST 0.0.0.0
ENV PORT 3000

# Start the Next.js production server
CMD ["node", "server.js"]
