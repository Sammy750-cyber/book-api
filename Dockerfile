# ================================
# Stage 1: Build
# ================================
FROM node:20-bookworm-slim AS builder

WORKDIR /app

# Install dependencies first so Docker can cache this layer.
COPY package*.json ./

RUN npm ci

# Copy application source.
COPY . .

# Compile TypeScript.
RUN npm run build


# ================================
# Stage 2: Production
# ================================
FROM node:20-bookworm-slim AS production

WORKDIR /app

ENV NODE_ENV=production

# Install production dependencies only.
COPY package*.json ./

RUN npm ci --omit=dev \
    && npm cache clean --force

# Copy only compiled application from builder.
COPY --from=builder /app/dist ./dist

# Run the application as the non-root Node user.
USER node

EXPOSE 3000

CMD ["node", "dist/index.js"]