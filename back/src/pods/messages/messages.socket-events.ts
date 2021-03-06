import SocketIOClient, { Socket } from 'socket.io';
import { Action, SocketInfo } from './messages.model';
import {
  processInputMessage,
  processOutputMessageCollection,
} from './processors';
import { InputMessageTypes, SocketMessageTypes } from './messages.consts';

export const messageSocketEvents = async (
  socket: Socket,
  io: SocketIOClient.Socket
) => {
  // WATCH OUT !! Reconnect is not implemented
  // In the connection input processing, we should
  // check if connectionId matches with userId and RoomId
  // if not reject, if it's accepted send connection
  // reestablished
  const { user, room, isMaster } = socket.handshake.query;
  console.log(`user ${user} connected`);
  console.log(`room request: ${room}`);
  console.log('*** Session ID:', socket.conn.id);

  const socketInfo: SocketInfo = {
    socket: socket,
    io,
    connectionId: socket.conn.id,
  };

  const outputMessageCollection = await processInputMessage(socketInfo, {
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

  socket.on('disconnect', async () => {
    const outputMessageCollection: Action[] = await processInputMessage(
      socketInfo,
      {
        type: SocketMessageTypes.DISCONNECT,
      }
    );

    processOutputMessageCollection(socketInfo, outputMessageCollection);
  });
};
