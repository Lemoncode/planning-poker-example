FROM node:16-alpine AS base
RUN mkdir -p /usr/app
WORKDIR /usr/app


# Build front
FROM base AS build-frontend
COPY ./front ./
RUN npm ci
RUN npm run build

# Build backend
FROM base AS build-backend
COPY ./back ./
RUN npm ci
RUN npm run build

# Release
FROM base AS release
COPY --from=build-backend /usr/app/dist ./
COPY --from=build-frontend /usr/app/dist ./public
COPY ./back/package.json ./
COPY ./back/package-lock.json ./
RUN npm ci --only=production

EXPOSE 3000
ENV PORT=3000

ENTRYPOINT [ "node", "index" ]
