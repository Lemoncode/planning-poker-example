import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useSnackbarContext } from './snackbar.hook';
import { SnackbarProvider } from './snackbar.context';

describe('Snackbar hook spec', () => {
  it('"showMessage" should be a funcion by default', () => {
    // Arrange
    const provider: React.FC = props => (
      <SnackbarProvider>{props.children}</SnackbarProvider>
    );

    // Act
    const { result } = renderHook(() => useSnackbarContext(), {
      wrapper: provider,
    });

    // Assert
    expect(result.current.showMessage).toEqual(expect.any(Function));
  });
});
