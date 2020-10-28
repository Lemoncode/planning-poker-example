import { createApp, createSocketServer } from 'core/servers';
import { envConstants } from 'core/constants';
import { roomApi } from 'pods/room';
import { connectToDB } from 'core/db';
import colors from 'colors';
import { messageSockets } from 'pods/messages/messages.sockets';

const app = createApp();

app.use(envConstants.apiUrl, roomApi);

app.listen(envConstants.PORT, () => {
  console.log(
    `Server ready at ${colors.cyan(
      `http://localhost:${envConstants.PORT}${envConstants.apiUrl}`
    )}`
  );
});

const socketServer = createSocketServer(app, messageSockets);

socketServer.listen(envConstants.socketPort, async () => {
  if (!envConstants.isApiMock && envConstants.MONGODB_URI) {
    await connectToDB(envConstants.MONGODB_URI);
  }

  console.log(
    `Sockets listening on port: ${colors.green(envConstants.socketPort)}`
  );
  const database = envConstants.isApiMock ? 'Mock' : 'MongoDB';
  console.log(`Using ${colors.cyan(database)} to storage sessions`);
});
