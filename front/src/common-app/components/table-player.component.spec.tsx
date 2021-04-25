import React from 'react';
import { getByText, render, screen } from '@testing-library/react';
import { PlayerVotingStatus } from 'core';
import { TablePlayerComponent } from './table-player.component';

describe('Table player component specs', () => {
  it('should display h6 heading with the "Players and votes:" text by default', () => {
    // Arrange
    interface Props {
      playersCollection: PlayerVotingStatus[];
    }

    const props: Props = {
      playersCollection: [
        {
          nickname: 'test player 1',
          voted: true,
          vote: 'XXL',
        },
      ],
    };

    // Act
    render(<TablePlayerComponent {...props} />);

    const h6Heading: HTMLElement = screen.getByRole('heading', {
      name: 'Players and votes:',
    });

    // Assert
    expect(h6Heading).toBeInTheDocument();
  });

  it('should display table by default', () => {
    // Arrange
    interface Props {
      playersCollection: PlayerVotingStatus[];
    }

    const props: Props = {
      playersCollection: [
        {
          nickname: 'test player 1',
          voted: true,
          vote: 'XXL',
        },
      ],
    };

    // Act
    render(<TablePlayerComponent {...props} />);

    const table: HTMLElement = screen.getByRole('table');

    // Assert
    expect(table).toBeInTheDocument();
  });

  it('should display one table row for the header and one more for each player', () => {
    // Arrange
    interface Props {
      playersCollection: PlayerVotingStatus[];
    }

    const props: Props = {
      playersCollection: [
        {
          nickname: 'test player 1',
          voted: true,
          vote: 'XXL',
        },
        {
          nickname: 'test player 2',
          voted: false,
          vote: 'S',
        },
      ],
    };

    // Act
    render(<TablePlayerComponent {...props} />);

    const rows: HTMLElement[] = screen.getAllByRole('row');

    // Assert
    expect(rows).toHaveLength(3);
  });

  it('should display three table cells within the header with default texts', () => {
    // Arrange
    interface Props {
      playersCollection: PlayerVotingStatus[];
    }

    const props: Props = {
      playersCollection: [
        {
          nickname: 'test player 1',
          voted: true,
          vote: 'XXL',
        },
      ],
    };

    const expectedHeaderCellText = [
      'Players connected',
      'Status Vote',
      'Result',
    ];

    // Act
    render(<TablePlayerComponent {...props} />);

    const table: HTMLElement = screen.getByRole('table');

    const headerCell1 = getByText(table, expectedHeaderCellText[0]);
    const headerCell2 = getByText(table, expectedHeaderCellText[1]);
    const headerCell3 = getByText(table, expectedHeaderCellText[2]);

    // Assert
    expect(headerCell1).toBeInTheDocument();
    expect(headerCell2).toBeInTheDocument();
    expect(headerCell3).toBeInTheDocument();
  });

  it('should display three table cells for each player', () => {
    // Arrange
    interface Props {
      playersCollection: PlayerVotingStatus[];
    }

    const props: Props = {
      playersCollection: [
        {
          nickname: 'test player 1',
          voted: true,
          vote: 'XXL',
        },
        {
          nickname: 'test player 2',
          voted: false,
          vote: 'S',
        },
      ],
    };

    // Act
    render(<TablePlayerComponent {...props} />);

    const cells: HTMLElement[] = screen.getAllByRole('cell');

    // Assert
    expect(cells).toHaveLength(6);
    expect(cells[0].innerHTML).toEqual(props.playersCollection[0].nickname);
    expect(cells[2].innerHTML).toEqual(props.playersCollection[0].vote);
    expect(cells[3].innerHTML).toEqual(props.playersCollection[1].nickname);
    expect(cells[5].innerHTML).toEqual(props.playersCollection[1].vote);
  });

  it('should display "checkIcon" when "player.voted" is true', () => {
    // Arrange
    interface Props {
      playersCollection: PlayerVotingStatus[];
    }

    const props: Props = {
      playersCollection: [
        {
          nickname: 'test player 1',
          voted: true,
          vote: 'XXL',
        },
      ],
    };

    // Act
    render(<TablePlayerComponent {...props} />);

    const checkIcon: HTMLElement = screen.getByLabelText('User voted');
    const closeIcon: HTMLElement = screen.queryByLabelText("User didn't vote");

    // Assert
    expect(checkIcon).toBeInTheDocument();
    expect(closeIcon).toBeNull();
  });

  it('should display "closeIcon" when "player.voted" is false', () => {
    // Arrange
    interface Props {
      playersCollection: PlayerVotingStatus[];
    }

    const props: Props = {
      playersCollection: [
        {
          nickname: 'test player 1',
          voted: false,
          vote: 'XXL',
        },
      ],
    };

    // Act
    render(<TablePlayerComponent {...props} />);

    const checkIcon: HTMLElement = screen.queryByLabelText('User voted');
    const closeIcon: HTMLElement = screen.getByLabelText("User didn't vote");

    // Assert
    expect(closeIcon).toBeInTheDocument();
    expect(checkIcon).toBeNull();
  });
});
