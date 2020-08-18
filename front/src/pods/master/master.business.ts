import { Player } from './master.vm';

export const AddNewPlayer = (playerCollection: Player[], nickname: string) => [
  ...playerCollection,
  { nickname, voted: false },
];

export const userVoted = (playerCollection: Player[], nickname: string) =>
  playerCollection.map(player =>
    player.nickname === nickname
      ? {
          ...player,
          voted: true,
        }
      : player
  );
