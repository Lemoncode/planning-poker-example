import * as ioClient from 'socket.io-client';
import { baseSocketUrl } from 'core';
import SocketIOClient, { Socket } from 'socket.io';
import { mapFromVmToApi } from './player.mapper';

export interface ConnectionSetup {
  user: string;
  room: string;
  isMaster: boolean;
}

export const createSocket = (data): Socket => {
  const player: ConnectionSetup = mapFromVmToApi(data);

  const socketParams = {
    url: baseSocketUrl,
    options: {
      query: { ...player },
      timeout: 60000,
    },
  };

  // TODO Add channel (room)
  return ioClient(baseSocketUrl, socketParams.options);
};
