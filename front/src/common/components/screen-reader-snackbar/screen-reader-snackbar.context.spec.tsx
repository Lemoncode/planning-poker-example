import React from 'react';
import { screen, render } from '@testing-library/react';
import {
  ScreenReaderSnackbarContext,
  ScreenReaderSnackbarProvider,
} from './screen-reader-snackbar.context';

describe('ScreenReaderSnackbar context specs', () => {
  it('"options" should have default values', () => {
    // Arrange
    const TestComponent: React.FC = () => {
      const { options } = React.useContext(ScreenReaderSnackbarContext);
      return <>{options && <h1>Test heading</h1>}</>;
    };

    // Act
    render(
      <ScreenReaderSnackbarProvider>
        <TestComponent />
      </ScreenReaderSnackbarProvider>
    );

    const heading: HTMLElement = screen.getByRole('heading', {
      name: 'Test heading',
    });

    // Assert
    expect(heading).toBeInTheDocument();
  });
});
