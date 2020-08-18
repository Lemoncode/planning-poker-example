import * as React from 'react';
import { PlayerComponent } from 'pods/player/player.component';
import Typography from '@material-ui/core/Typography';
import { Player } from '../master.vm';

interface Props {
  playerCollection: Player[];
}

export const PlayersConnectedComponent: React.FC<Props> = (props: Props) => {
  const { playerCollection } = props;
  return (
    <>
      <Typography variant="h3">Players connected:</Typography>
      <ul>
        {playerCollection.map(player => (
          <li key={player.nickname}>
            {player.nickname} {player.voted ? '- Voted' : ''}
          </li>
        ))}
      </ul>
    </>
  );
};
