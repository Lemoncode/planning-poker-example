import React from 'react';
import { render, screen } from '@testing-library/react';
import { SnackbarProvider } from './snackbar.context';
import { SnackbarComponent } from './snackbar.component';

describe('Snackbar component specs', () => {
  it('', () => {
    // Arrange

    // Act
    render(
      <SnackbarProvider>
        <SnackbarComponent />
      </SnackbarProvider>
    );

    // Assert
  });
});
