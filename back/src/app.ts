import express from 'express';
import path from 'path';

import { createApp, createSocketServer } from 'core/servers';
import { envConstants } from 'core/constants';
import { roomApi } from 'pods/room';
import { connectToDB } from 'core/db';
import colors from 'colors';

const app = createApp();

app.use(envConstants.API_URL, roomApi);

const staticFilesPath = path.resolve(__dirname, envConstants.STATIC_FILES_PATH);
app.use('/', express.static(staticFilesPath));

const appServer = app.listen(envConstants.PORT, async () => {
  if (!envConstants.isMockRepository && envConstants.MONGODB_URI) {
    await connectToDB(envConstants.MONGODB_URI);
  }
  const database = envConstants.isMockRepository ? 'Mock' : 'MongoDB';
  console.log(`Using ${colors.cyan(database)} to storage sessions`);
  console.log(
    `Server ready at ${colors.cyan(
      `http://localhost:${envConstants.PORT}${envConstants.API_URL}`
    )}`
  );
});

createSocketServer(appServer);
