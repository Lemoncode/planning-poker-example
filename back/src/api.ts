import { Router } from 'express';
import { generateNewRoomName } from './business';

export const api = Router();

api.get('/create-room', async (req, res) => {
  const roomName = generateNewRoomName();
  res.send({ name: roomName });
});

api.post('/enroll-room', async (req, res) => {
  // TODO: ensure parameter is informed
  const roomName = req.body.name;

  res.send({ error: roomName });
});
