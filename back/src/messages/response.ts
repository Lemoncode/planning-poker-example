export const responseType = {
  CONNECTION_ACK: 'CONNECTION_ACK',
  NEW_STORY: 'NEW_STORY'
};

export interface ResponseBase {
  type: string;
  payload?: any;
}
