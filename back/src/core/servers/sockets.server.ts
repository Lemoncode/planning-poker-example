import SocketIOClient, { Socket } from 'socket.io';

export const createSocketServer = (app, sockets) => {
  const http = require('http').Server(app);
  // set up socket.io and bind it to our
  // http server.
  const io: SocketIOClient.Socket = require('socket.io')(http);
  // whenever a user connects on port envConstants.socketPort via
  // a websocket, log that a user has connected
  io.on('connection', async (socket: Socket) => await sockets(socket, io));

  return http;
};
