export const responseType = {
  CONNECTION_ACK: 'CONNECTION_ACK',
};

export interface ResponseBase {
  type: string;
  payload?: any;
}
