import * as ioClient from 'socket.io-client';
import { baseSocketUrl } from 'core';

export interface ConnectionSetup {
  user: string;
}

export const createSocket = (connectionSetup: ConnectionSetup) => {
  const socketParams = {
    url: baseSocketUrl,
    options: {
      query: `user=${connectionSetup.user}`,
    },
  };

  // TODO Add channel (room)
  return ioClient(baseSocketUrl, socketParams.options);
};
