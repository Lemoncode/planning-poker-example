import React from 'react';
import { screen, render } from '@testing-library/react';
import { SnackbarProvider } from 'common';
import { VoteOptionsComponent } from './vote-options.component';

describe('Vote options component spec', () => {
  it('"snackbar" component should not be displayed by default', () => {
    // Arrange
    interface Props {
      onVoteChosen: (vote: string) => void;
      buttonFinishVoting?: React.FC;
      votedStatus: boolean;
    }

    const props: Props = {
      onVoteChosen: jest.fn(),
      votedStatus: false,
    };

    // Act
    render(
      <SnackbarProvider>
        <VoteOptionsComponent {...props} />
      </SnackbarProvider>
    );

    const h3Heading: HTMLElement = screen.queryByRole('alert');

    // Assert
    expect(h3Heading).toBeNull();
  });

  it('"h3" should show "Select and send vote" text when "votedStatus" is false', () => {
    // Arrange
    interface Props {
      onVoteChosen: (vote: string) => void;
      buttonFinishVoting?: React.FC;
      votedStatus: boolean;
    }

    const props: Props = {
      onVoteChosen: jest.fn(),
      votedStatus: false,
    };

    const expectedH3Value: string = 'Select and send vote';

    // Act
    render(
      <SnackbarProvider>
        <VoteOptionsComponent {...props} />
      </SnackbarProvider>
    );

    const h3Heading: HTMLElement = screen.getByRole('heading', {
      name: expectedH3Value,
    });

    // Assert
    expect(h3Heading).toBeInTheDocument();
  });

  it('"h3" should show "Your vote:" text when "votedStatus" is true', () => {
    // Arrange
    interface Props {
      onVoteChosen: (vote: string) => void;
      buttonFinishVoting?: React.FC;
      votedStatus: boolean;
    }

    const props: Props = {
      onVoteChosen: jest.fn(),
      votedStatus: true,
    };

    const expectedH3Value: string = 'Your vote:';

    // Act
    render(
      <SnackbarProvider>
        <VoteOptionsComponent {...props} />
      </SnackbarProvider>
    );

    const h3Heading: HTMLElement = screen.getByRole('heading', {
      name: expectedH3Value,
    });

    // Assert
    expect(h3Heading).toBeInTheDocument();
  });

  it('"cards" should be displayed with values from "TShirtVotes"', () => {
    // Arrange
    interface Props {
      onVoteChosen: (vote: string) => void;
      buttonFinishVoting?: React.FC;
      votedStatus: boolean;
    }

    const props: Props = {
      onVoteChosen: jest.fn(),
      votedStatus: true,
    };

    // Act
    render(
      <SnackbarProvider>
        <VoteOptionsComponent {...props} />
      </SnackbarProvider>
    );

    const cardXXLHeading: HTMLElement = screen.getByRole('heading', {
      name: 'XXL',
    });
    const cardXLHeading: HTMLElement = screen.getByRole('heading', {
      name: 'XL',
    });
    const cardLHeading: HTMLElement = screen.getByRole('heading', {
      name: 'L',
    });
    const cardMHeading: HTMLElement = screen.getByRole('heading', {
      name: 'M',
    });
    const cardSHeading: HTMLElement = screen.getByRole('heading', {
      name: 'S',
    });

    const cardXSHeading: HTMLElement = screen.getByRole('heading', {
      name: 'XS',
    });

    // Assert
    expect(cardXXLHeading).toBeInTheDocument();
    expect(cardXLHeading).toBeInTheDocument();
    expect(cardLHeading).toBeInTheDocument();
    expect(cardMHeading).toBeInTheDocument();
    expect(cardSHeading).toBeInTheDocument();
    expect(cardXSHeading).toBeInTheDocument();
  });

  it('"button" should not be displayed text when "votedStatus" is true', () => {
    // Arrange
    interface Props {
      onVoteChosen: (vote: string) => void;
      buttonFinishVoting?: React.FC;
      votedStatus: boolean;
    }

    const props: Props = {
      onVoteChosen: jest.fn(),
      votedStatus: true,
    };

    // Act
    render(
      <SnackbarProvider>
        <VoteOptionsComponent {...props} />
      </SnackbarProvider>
    );

    const button: HTMLElement = screen.queryByRole('button');

    // Assert
    expect(button).toBeNull();
  });

  it('"button" should be displayed text when "votedStatus" is false', () => {
    // Arrange
    interface Props {
      onVoteChosen: (vote: string) => void;
      buttonFinishVoting?: React.FC;
      votedStatus: boolean;
    }

    const props: Props = {
      onVoteChosen: jest.fn(),
      votedStatus: false,
    };

    // Act
    render(
      <SnackbarProvider>
        <VoteOptionsComponent {...props} />
      </SnackbarProvider>
    );

    const button: HTMLElement = screen.getByRole('button');

    // Assert
    expect(button).toBeInTheDocument();
  });
});
