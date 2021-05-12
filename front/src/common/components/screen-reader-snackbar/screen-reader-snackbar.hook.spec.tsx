import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useScreenReaderSnackbarContext } from './screen-reader-snackbar.hook';
import { ScreenReaderSnackbarProvider } from './screen-reader-snackbar.context';

describe('Snackbar hook spec', () => {
  it('"showScreenReaderMessage" should be a funcion by default', () => {
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
    expect(result.current.showScreenReaderMessage).toEqual(
      expect.any(Function)
    );
  });

  it('"setOptions" should be called when calling "showScreenReaderMessage', () => {
    // Arrange
    const provider: React.FC = props => (
      <ScreenReaderSnackbarProvider>
        {props.children}
      </ScreenReaderSnackbarProvider>
    );

    const setOptions = jest.fn();
    const options = {
      messages: [],
    };
    jest.spyOn(React, 'useContext').mockReturnValue({ setOptions, options });

    // Act
    const { result } = renderHook(() => useScreenReaderSnackbarContext(), {
      wrapper: provider,
    });

    result.current.showScreenReaderMessage('Test message');

    // Assert
    expect(setOptions).toHaveBeenCalledTimes(1);
    expect(setOptions).toHaveBeenCalledWith({
      messages: ['Test message'],
    });
  });
});
