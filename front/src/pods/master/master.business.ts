import { PlayerVotingStatus } from 'core';

export const AddNewPlayer = (
  playerCollection: PlayerVotingStatus[],
  nickname: string
): PlayerVotingStatus[] => [
  ...playerCollection,
  { nickname, voted: false, vote: '' },
];


export const userVoted = (
  playerCollection: PlayerVotingStatus[],
  nickname: string
) =>
  playerCollection.map(player =>
    player.nickname === nickname
      ? {
          ...player,
          voted: true,
          vote: '',
        }
      : player
  );
