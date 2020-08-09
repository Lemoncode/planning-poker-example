import * as ioClient from 'socket.io-client';
import { baseSocketUrl } from 'core';

// TODO: this should be moved to common-app or core
export interface ConnectionSetup {
  user: string;
  room: string;
  isMaster: boolean;
}

export const createSocket = (connectionSetup: ConnectionSetup) => {
  const { user, room, isMaster } = connectionSetup;
  const socketParams = {
    url: baseSocketUrl,
    options: {
      query: { user, room, isMaster },
    },
  };

  // TODO Add channel (room)
  return ioClient(baseSocketUrl, socketParams.options);
};
