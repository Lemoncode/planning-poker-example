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

  it('"setOpen" and "setOptions" should be called when calling "showMessage', () => {
    // Arrange
    const provider: React.FC = props => (
      <SnackbarProvider>{props.children}</SnackbarProvider>
    );

    const setOptions = jest.fn();
    const setOpen = jest.fn();

    jest.spyOn(React, 'useContext').mockReturnValue({ setOptions, setOpen });

    // Act
    const { result } = renderHook(() => useSnackbarContext(), {
      wrapper: provider,
    });

    result.current.showMessage('Test message', 'success');

    // Assert
    expect(setOptions).toHaveBeenCalledTimes(1);
    expect(setOptions).toHaveBeenCalledWith({
      message: 'Test message',
      variant: 'success',
    });
    expect(setOpen).toHaveBeenCalledTimes(1);
    expect(setOpen).toHaveBeenCalledWith(true);
  });
});
