import React from 'react';
import { screen, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { SnackbarContext, SnackbarProvider } from './snackbar.context';

describe('Snackbar context specs', () => {
  it('dummy', () => {
    // Arrange
    // Act
    render(<SnackbarProvider />);
    const { result } = renderHook(() => SnackbarContext);
    // Assert
    expect(result.current.Provider);
  });
});
