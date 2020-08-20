import { actionIds } from "./definitions";
import { ActionBase } from "core";

export const AddPlayer = (nickname: string): ActionBase => ({
  type: actionIds.ADD_PLAYER,
  payload: nickname,
});
