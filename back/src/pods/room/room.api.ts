import { Router } from 'express';
import { generateNewRoomName } from './room-name-generator.business';

export const roomApi = Router();

roomApi.get(`/create-room`, async (req, res) => {
  const roomName = generateNewRoomName();
  res.send({ name: roomName });
});

roomApi.post(`/enroll-room`, async (req, res) => {
  // TODO: ensure parameter is informed
  const roomName = req.body.name;

  res.send({ error: roomName });
});
