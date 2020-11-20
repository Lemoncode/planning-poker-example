import SocketIOClient, { Socket } from 'socket.io';

export const createSocketServer = (app, socketEventsInitializer) => {
  const io: SocketIOClient.Socket = require('socket.io')(app);

  io.on('connection', async (socket: Socket) => {
    await socketEventsInitializer(socket, io);
  });
};
