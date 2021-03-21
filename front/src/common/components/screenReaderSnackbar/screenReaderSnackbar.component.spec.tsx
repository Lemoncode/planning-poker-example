import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  ScreenReaderSnackbarProvider,
  ScreenReaderSnackbarContext,
} from './screenReadersnackbar.context';
import { ScreenReaderSnackbarComponent } from './screenReaderSnackbar.component';

describe('ScreenReaderSnackbar component specs', () => {
  it('"ScreenReaderSnackbar" should not be displayed nothing by default', () => {
    // Arrange

    // Act
    render(
      <ScreenReaderSnackbarProvider>
        <ScreenReaderSnackbarComponent />
      </ScreenReaderSnackbarProvider>
    );

    // Assert
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });

  it('"ScreenReaderSnackbar"  should be displayed when setting have some message', () => {
    // Arrange
    const TestComponent: React.FC = () => {
      const { setOptions } = React.useContext(ScreenReaderSnackbarContext);
      React.useEffect(
        () =>
          setOptions({
            messages: ['Test'],
          }),
        []
      );
      return <></>;
    };

    // Act
    render(
      <ScreenReaderSnackbarProvider>
        <TestComponent />
        <ScreenReaderSnackbarComponent />
      </ScreenReaderSnackbarProvider>
    );

    // Assert
    expect(screen.getByRole('paragraph')).toBeInTheDocument();
  });
});
