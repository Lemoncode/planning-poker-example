import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSessionSchema = new Schema({
  connectionId: String,
  room: String,
  nickname: String,
  body: String,
  vote: String,
  isMaster: Boolean,
  hasVoted: Boolean,
});

export const UserSessionModel = model('userSession', userSessionSchema);
