import { createApp } from 'core/servers';
import { envConstants } from 'core/env.constants';
import { roomApi } from 'pods/room';
import mongoose from 'mongoose';
const { connect } = mongoose;
import SocketIOClient, { Socket } from 'socket.io';
import { Action, SocketInfo } from 'dals/messages';
import {
  processInputMessage,
  InputMessageTypes,
  processOutputMessageCollection,
} from 'pods/messages';
import colors from 'colors';

const app = createApp();

let http = require('http').Server(app);
// set up socket.io and bind it to our
// http server.
let io: SocketIOClient.Socket = require('socket.io')(http);

app.use(roomApi);

app.listen(envConstants.PORT, () => {
  console.log(
    `Server ready at ${colors.cyan(
      `http://localhost:${envConstants.PORT}${envConstants.apiUrl}`
    )}`
  );
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on('connection', async (socket: Socket) => {
  // WATCH OUT !! Reconnect is not implemented
  // In the connection input processing, we should
  // check if connectionId matches with userId and RoomId
  // if not reject, if it's accepted send connection
  // reestablished
  const { user, room, isMaster } = socket.handshake.query;
  console.log(`user ${user} connected`);
  console.log(`room request: ${room}`);
  console.log('*** Session ID:', socket.conn.id);

  let outputMessageCollection: Action[] = [];
  const socketInfo: SocketInfo = {
    socket: socket,
    io,
    connectionId: socket.conn.id,
  };

  // TODO encapuslate this to processInputMessage
  outputMessageCollection = await processInputMessage(socketInfo, {
    type:
      isMaster === 'true'
        ? InputMessageTypes.ESTABLISH_CONNECTION_MASTER
        : InputMessageTypes.ESTABLISH_CONNECTION_PLAYER,
    payload: {
      nickname: user,
      room,
    },
  });

  processOutputMessageCollection(socketInfo, outputMessageCollection);

  socket.on('message', async (message: any) => {
    console.log(message);
    if (message && message.type) {
      const outputMessageCollection: Action[] = await processInputMessage(
        socketInfo,
        message
      );

      processOutputMessageCollection(socketInfo, outputMessageCollection);
    }
  });
});

const server = http.listen(3000, () => {
  console.log(`Sockets listening on port: ${colors.green('3000')}`);
  const database = envConstants.isApiMock ? 'Mock' : 'MongoDB';
  console.log(`Using ${colors.cyan(database)} to storage sessions`);
  if (!envConstants.isApiMock && envConstants.mongoUrl) {
    connect(envConstants.mongoUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
      .then(() =>
        console.log(colors.yellow('Mongo database'), colors.green('connected'))
      )
      .catch((err) => console.log(colors.red('Mongo can not connect'), err));
  }
});
