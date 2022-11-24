FROM node:16-alpine AS base
RUN mkdir -p /usr/app
WORKDIR /usr/app


# Build front
FROM base AS build-frontend
COPY ./front ./
ARG BASE_API_URL
ENV BASE_API_URL=$BASE_API_URL
ARG BASE_APP_URL
ENV BASE_APP_URL=$BASE_APP_URL
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

FROM nasdan/azure-pm2-nginx
ENV NODE_ENV=production
ENV STATIC_FILES_PATH=./public
ENV MOCK_REPOSITORY=false
ENV CORS_ORIGIN=false
ENV API_URL=/api
COPY --from=release /usr/src/app ./

COPY nginx.conf /etc/nginx/conf.d/default.conf

ENV INTERNAL_PORT=3000
RUN sed -i -e 's|INTERNAL_PORT|'"$INTERNAL_PORT"'|g' /etc/nginx/conf.d/default.conf

CMD sh docker-entrypoint.sh && \
  sed -i -e 's|PORT|80|g' /etc/nginx/conf.d/default.conf && \
  pm2 start ./index.js --name "app" --env production && \
  nginx -g 'daemon off;'
