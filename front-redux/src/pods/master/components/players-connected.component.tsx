import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { Player } from '../master.vm';

interface Props {
  playerCollection: Player[];
  headingLevel?: string;
}

export const PlayersConnectedComponent: React.FC<Props> = (props: Props) => {
  const { playerCollection, headingLevel } = props;
  return (
    <>
      <Typography variant="h3" component={headingLevel}>
        Players connected:
      </Typography>
      <ul>
        {playerCollection.map((player) => (
          <li key={player.nickname}>
            {player.nickname} {player.voted ? '- Voted' : ''}
          </li>
        ))}
      </ul>
    </>
  );
};

PlayersConnectedComponent.defaultProps = {
  headingLevel: 'h2',
};
