# ================================
# Stage 1: Build
# ================================
FROM node:20-bookworm-slim AS builder

WORKDIR /app

# Apply Debian security updates.
RUN apt-get update \
    && apt-get upgrade -y \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies first for Docker layer caching.
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

# Apply Debian security updates.
RUN apt-get update \
    && apt-get upgrade -y \
    && rm -rf /var/lib/apt/lists/*

# Install production dependencies.
COPY package*.json ./

RUN npm ci --omit=dev \
    && npm cache clean --force \
    && rm -rf /usr/local/lib/node_modules/npm \
              /usr/local/bin/npm \
              /usr/local/bin/npx

# Copy compiled application.
COPY --from=builder /app/dist ./dist

# Run as non-root.
USER node

EXPOSE 3000

HEALTHCHECK --interval=30s \
    --timeout=5s \
    --start-period=10s \
    --retries=3 \
    CMD node -e "require('http').get('http://127.0.0.1:3000/health', res => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "dist/index.js"]