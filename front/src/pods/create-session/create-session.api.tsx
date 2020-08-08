import Axios from 'axios';
import { baseApiUrl } from 'core';

const getRoomUrl = `${baseApiUrl}/api/create-room`;

export const createRoom = async (): Promise<string> => {
  // TODO Error handling
  const result = await Axios.get(getRoomUrl);

  return result.data.name;
};
