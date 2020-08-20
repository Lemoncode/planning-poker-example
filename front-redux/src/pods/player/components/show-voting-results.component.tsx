import * as React from 'react';
import { VoteResult } from '../player.vm';

interface Props {
  voteCollectionResult: VoteResult[];
}

export const ShowVotingResults: React.FC<Props> = props => {
  const { voteCollectionResult } = props;
  return (
    <>
      <span>Show Voting results</span>
      <ul>
        {voteCollectionResult.map(({ nickname, vote }) => (
          <li key={nickname}>
            {nickname} - {vote}
          </li>
        ))}
      </ul>
    </>
  );
};
