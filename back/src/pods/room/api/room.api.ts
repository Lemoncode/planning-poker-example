import { Router } from 'express';
import { generateNewRoomName } from '../business';
import { envConstants } from 'core/env.constants';

const apiUrl = envConstants.apiUrl;
export const roomApi = Router();

roomApi.get(`${apiUrl}/create-room`, async (req, res) => {
  const roomName = generateNewRoomName();
  res.send({ name: roomName });
});

roomApi.post(`${apiUrl}/enroll-room`, async (req, res) => {
  // TODO: ensure parameter is informed
  const roomName = req.body.name;

  res.send({ error: roomName });
});
