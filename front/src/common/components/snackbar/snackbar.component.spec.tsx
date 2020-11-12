import React from 'react';
import { render, screen } from '@testing-library/react';
import { SnackbarProvider, SnackbarContext } from './snackbar.context';
import { SnackbarComponent } from './snackbar.component';

describe('Snackbar component specs', () => {
  it('', () => {
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
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
