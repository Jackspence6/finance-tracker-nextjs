# Dependencies & Build
FROM --platform=linux/amd64 node:20-alpine AS build

# Create app directory
WORKDIR /app

# Install dependencies first (cacheable)
COPY package.json package-lock.json* ./
RUN npm ci --production=false

# Copy rest of the app
COPY . .

# Build the Next.js application
RUN npm run build

# Production Runtime
FROM --platform=linux/amd64 node:20-alpine AS production

# Set working directory
WORKDIR /app

# Only copy the production dependencies & output from build
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

# Set environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Run app
CMD ["npm", "start"]
