import { createApp } from './express.server';
import { envConstants } from './env.constants';
import { api } from './api';
import cors from 'cors';
import mongoose from 'mongoose';
const { connect } = mongoose;
import SocketIOClient, { Socket } from 'socket.io';
import {
  processInputMessage,
  InputMessageTypes,
  processOutputMessageCollection,
  Action,
  SocketInfo,
} from './messages';

const app = createApp();

let http = require('http').Server(app);
// set up socket.io and bind it to our
// http server.
let io: SocketIOClient.Socket = require('socket.io')(http);

//options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  // IMPORTANT LIMIT HERE YOUR CLIENT APPS DOMAINS
  origin: '*',
  preflightContinue: false,
};

app.use(cors(options));
app.use('/api', api);

app.listen(envConstants.PORT, () => {
  console.log(`Server ready at http://localhost:${envConstants.PORT}/api`);
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on('connection', function (socket: Socket) {
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
  outputMessageCollection = processInputMessage(socketInfo, {
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

  socket.on('message', function (message: any) {
    console.log(message);
    if (message && message.type) {
      const outputMessageCollection: Action[] = processInputMessage(
        socketInfo,
        message
      );

      processOutputMessageCollection(socketInfo, outputMessageCollection);
    }
  });
});

const server = http.listen(3000, () => {
  console.log('listening on *:3000');
  const database = envConstants.DATABASE ? 'mock' : 'mongo';
  console.log(`database with ${database}`);
  if (envConstants.DATABASE !== 'mock' && envConstants.MONGO_URL) {
    connect(envConstants.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
      .then(() => console.log('Mongo database connected'))
      .catch((err) => console.log('Mongo can not connect', err));
  }
});
