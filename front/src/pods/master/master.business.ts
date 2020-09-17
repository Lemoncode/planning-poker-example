// import { Player } from './master.vm';
import { PlayerEntity, createDefaultPlayerEntity } from 'core';

export const AddNewPlayer = (
  playerCollection: PlayerEntity[],
  // nickname: string,
  // room: string
  newPlayer: PlayerEntity
) => [...playerCollection, newPlayer];

export const userVoted = (
  playerCollection: PlayerEntity[],
  nickname: string,
  vote: string
) =>
  playerCollection.map(player =>
    player.nickname === nickname
      ? {
          ...player,
          voted: true,
          vote: vote,
        }
      : player
  );
