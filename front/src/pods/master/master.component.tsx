import * as React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { appBaseUrl } from 'core';
import { DefineStoryComponent, PlayersConnectedComponent } from './components';
import { Player } from './master.vm';

interface Props {
  room: string;
  playerCollection: Player[];
  onSetStoryTitle: (title: string) => void;
  storyBeingVoted: boolean;
}

export const MasterComponent: React.FC<Props> = props => {
  const { room, playerCollection, onSetStoryTitle, storyBeingVoted } = props;

  return (
    <>
      <Typography variant="h3">
        Share this link to let other participants join the session:
      </Typography>

      <Typography variant="h3">{`${appBaseUrl}/#/player/${room}`}</Typography>

      {room ? (
        <>
          <CommandLine
            onSetStoryTitle={onSetStoryTitle}
            storyBeingVoted={storyBeingVoted}
          />
          <PlayersConnectedComponent playerCollection={playerCollection} />
        </>
      ) : null}
    </>
  );
};

interface PropsCommandLine {
  storyBeingVoted: boolean;
  onSetStoryTitle: (title: string) => void;
}

const CommandLine: React.FC<PropsCommandLine> = props => {
  const { storyBeingVoted, onSetStoryTitle } = props;

  return (
    <>
      {!storyBeingVoted ? (
        <DefineStoryComponent onSubmit={onSetStoryTitle} />
      ) : (
        <span>Finish Vote</span>
      )}
    </>
  );
};
