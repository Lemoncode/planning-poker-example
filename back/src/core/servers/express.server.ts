import express from 'express';
import bodyParser from 'body-parser';
import { envConstants } from 'core/constants';
import { corsOptions } from './cors';
import { redirectHttpsMiddleware } from './middlewares';

export const createApp = () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(corsOptions);

  if (envConstants.isProduction) {
    app.use(redirectHttpsMiddleware);
  }
  return app;
};
