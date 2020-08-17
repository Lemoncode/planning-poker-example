import * as React from 'react';
import { PlayerComponent } from 'pods/player/player.component';
import Typography from '@material-ui/core/Typography';

interface Props {
  playerCollection: string[];
}

export const PlayersConnectedComponent: React.FC<Props> = (props: Props) => {
  const { playerCollection } = props;
  return (
    <>
      <Typography variant="h3">Players connected:</Typography>
      <ul>
        {playerCollection.map(player => (
          <li key={player}>{player}</li>
        ))}
      </ul>
    </>
  );
};
