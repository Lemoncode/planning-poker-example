import React from 'react';
import { render, screen } from '@testing-library/react';
import { SnackbarProvider, SnackbarContext } from './snackbar.context';
import { SnackbarComponent } from './snackbar.component';

describe('Snackbar component specs', () => {
  it('"Snackbar" should not be displayed by default', () => {
    // Arrange

    // Act
    render(
      <SnackbarProvider>
        <SnackbarComponent />
      </SnackbarProvider>
    );

    // Assert
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('"Snackbar" and "button" should be displayed when setting "open" to true', () => {
    // Arrange
    const TestComponent: React.FC = () => {
      const { setOpen } = React.useContext(SnackbarContext);
      React.useEffect(() => setOpen(true), []);
      return <></>;
    };

    // Act
    render(
      <SnackbarProvider>
        <TestComponent />
        <SnackbarComponent />
      </SnackbarProvider>
    );

    // Assert
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  // TO DO - Check if Snackbar is closed when clicking button
  // Maybe it is not possible to do it because MUI is giving some troubles.
  // There is no way of mocking the context so it is impossible to use a spy and know
  // if "onClose" has been called
});
