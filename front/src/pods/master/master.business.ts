import { PlayerVotingStatus } from 'core';

export const AddNewPlayer = (
  playerCollection: PlayerVotingStatus[],
  nickname: string
) => [...playerCollection, { nickname, voted: false }];

export const userVoted = (
  playerCollection: PlayerVotingStatus[],
  nickname: string
) =>
  playerCollection.map(player =>
    player.nickname === nickname
      ? {
          ...player,
          voted: true,
        }
      : player
  );
