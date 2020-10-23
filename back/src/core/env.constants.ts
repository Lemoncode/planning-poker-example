export const envConstants = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  isApiMock: process.env.API_MOCK === 'true',
  mongoUrl: process.env.MONGO_URL,
  apiUrl: process.env.API_URL,
};
