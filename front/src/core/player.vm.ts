export interface PlayerEntity {
  nickname: string;
  isMaster: boolean;
  voted: boolean;
  vote: string;
  room: string;
}

export const createDefaultPlayerEntity = () => ({
  nickname: '',
  isMaster: false,
  voted: false,
  vote: '',
  room: '',
});
