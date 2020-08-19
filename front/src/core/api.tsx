import * as ioClient from 'socket.io-client';
import { baseSocketUrl } from 'core';
import SocketIOClient, { Socket } from 'socket.io';

export interface ConnectionSetup {
  user: string;
  room: string;
  isMaster: boolean;
}

export const createSocket = (connectionSetup: ConnectionSetup): Socket => {
  const { user, room, isMaster } = connectionSetup;
  const socketParams = {
    url: baseSocketUrl,
    options: {
      query: { user, room, isMaster },
      timeout: 60000,
    },
  };

  // TODO Add channel (room)
  return ioClient(baseSocketUrl, socketParams.options);
};
