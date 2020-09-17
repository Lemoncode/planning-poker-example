import React from 'react';
import { PlayerEntity } from './player.vm';

interface Props {
  players: PlayerEntity[];
  setPlayers: (Players: PlayerEntity[]) => void;
}

export const PlayersContext = React.createContext<Props>({
  players: [],
  setPlayers: (newPlayers: PlayerEntity[]) => newPlayers,
});

export const PlayersProvider: React.FC = props => {
  const { children } = props;
  const [players, setPlayers] = React.useState([]);

  return (
    <PlayersContext.Provider value={{ players, setPlayers }}>
      {children}
    </PlayersContext.Provider>
  );
};
