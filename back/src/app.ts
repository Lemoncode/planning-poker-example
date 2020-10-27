import { createApp } from 'core/servers';
import { envConstants } from 'core/constants';
import { roomApi } from 'pods/room';
import { connectToDB } from 'core/db';
import SocketIOClient, { Socket } from 'socket.io';
import { sockets } from 'core/sockets';
import colors from 'colors';

const app = createApp();

app.use(envConstants.apiUrl, roomApi);

app.listen(envConstants.PORT, () => {
  console.log(
    `Server ready at ${colors.cyan(
      `http://localhost:${envConstants.PORT}${envConstants.apiUrl}`
    )}`
  );
});

const http = require('http').Server(app);
// set up socket.io and bind it to our
// http server.
const io: SocketIOClient.Socket = require('socket.io')(http);
// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on('connection', async (socket: Socket) => await sockets(socket, io));

http.listen(3000, async () => {
  if (!envConstants.isApiMock && envConstants.MONGODB_URI) {
    await connectToDB(envConstants.MONGODB_URI);
  }

  console.log(`Sockets listening on port: ${colors.green('3000')}`);
  const database = envConstants.isApiMock ? 'Mock' : 'MongoDB';
  console.log(`Using ${colors.cyan(database)} to storage sessions`);
});
