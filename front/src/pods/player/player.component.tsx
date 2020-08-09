import * as React from 'react';

interface Props {
  room: string;
}

export const PlayerComponent: React.FC<Props> = props => {
  const { room } = props;

  return <h1>Player poker session: {room}</h1>;
};
