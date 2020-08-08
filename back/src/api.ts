import { Router } from 'express';

export const api = Router();

api.get('/create-room', async (req, res) => {
  const roomName = 'fistro-3242';
  res.send({ name: roomName });
});

api.post('/enroll-room', async (req, res) => {
  // TODO: ensure parameter is informed
  const roomName = req.body.name;

  
  res.send({ error: roomName });
});
