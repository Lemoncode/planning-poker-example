import * as viewModel from './player.vm';
import * as apiModel from './api';

export const mapFromApiToVm = (
  player: apiModel.ConnectionSetup
): viewModel.PlayerEntity => ({
  nickname: player.user,
  isMaster: player.isMaster,
  room: player.room,
  vote: '',
  voted: false,
});

export const mapFromVmToApi = (
  player: viewModel.PlayerEntity
): apiModel.ConnectionSetup => ({
  user: player.nickname,
  room: player.room,
  isMaster: player.isMaster,
});
