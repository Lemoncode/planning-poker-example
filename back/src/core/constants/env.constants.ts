export const envConstants = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  isApiMock: process.env.API_MOCK === 'true',
  MONGODB_URI: process.env.MONGODB_URI,
  apiUrl: process.env.API_URL,
  corsOrigin: process.env.CORS_ORIGIN || "*",
};
