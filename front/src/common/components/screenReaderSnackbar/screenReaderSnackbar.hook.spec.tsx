import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useScreenReaderSnackbarContext } from './screenReaderSnackbar.hook';
import { ScreenReaderSnackbarProvider } from './screenReadersnackbar.context';

describe('Snackbar hook spec', () => {
  it('"showScreeanReaderMessage" should be a funcion by default', () => {
    // Arrange
    const provider: React.FC = props => (
      <ScreenReaderSnackbarProvider>
        {props.children}
      </ScreenReaderSnackbarProvider>
    );

    // Act
    const { result } = renderHook(() => useScreenReaderSnackbarContext(), {
      wrapper: provider,
    });

    // Assert
    expect(result.current.showScreeanReaderMessage).toEqual(
      expect.any(Function)
    );
  });

  it('"setOpen" and "setOptions" should be called when calling "showScreeanReaderMessage', () => {
    // Arrange
    const provider: React.FC = props => (
      <ScreenReaderSnackbarProvider>
        {props.children}
      </ScreenReaderSnackbarProvider>
    );

    const setOptions = jest.fn();

    jest.spyOn(React, 'useContext').mockReturnValue({ setOptions });

    // Act
    const { result } = renderHook(() => useScreenReaderSnackbarContext(), {
      wrapper: provider,
    });

    result.current.showScreeanReaderMessage(['Test message']);

    // Assert
    expect(setOptions).toHaveBeenCalledTimes(1);
    expect(setOptions).toHaveBeenCalledWith({
      messages: ['Test message'],
    });
  });
});
