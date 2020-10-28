import { Document, model, Schema } from 'mongoose';
import { UserSession } from 'dals/user';

const userSessionSchema = new Schema({
  connectionId: Schema.Types.String,
  room: Schema.Types.String,
  nickname: Schema.Types.String,
  body: Schema.Types.String,
  vote: Schema.Types.String,
  isMaster: Schema.Types.Boolean,
  hasVoted: Schema.Types.Boolean,
});

export const UserSessionContext = model<UserSession & Document>(
  'UserSession',
  userSessionSchema
);
