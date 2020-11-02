import React from 'react';
import { screen, render } from '@testing-library/react';
import { VoteOptionsComponent } from './vote-options.component';

describe('Vote options component spec', () => {
  it('h3 should show "Select and send vote" text when "votedStatus" is false', () => {
    // Arrange
    interface Props {
      onVoteChosen: (vote: string) => void;
      buttonFinishVoting?: React.FC;
      votedStatus: boolean;
    }
    const props: Props = {
      onVoteChosen: function() {},
      votedStatus: false,
    };

    const expectedH3Value: string = 'Select and send vote';

    // Act
    render(<VoteOptionsComponent {...props} />);

    const h3Heading = screen.getByRole('heading', { name: expectedH3Value });

    // Assert
    expect(h3Heading).toBeInTheDocument();
  });
});
