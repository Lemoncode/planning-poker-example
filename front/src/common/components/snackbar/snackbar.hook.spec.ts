import { renderHook } from '@testing-library/react-hooks';
import { useSnackbarContext } from './snackbar.hook';
import * as SnackbarContext from './snackbar.context';

describe('Snackbar hook spec', () => {
  it('"showMessage" should be a funcion by default', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useSnackbarContext());

    jest
      .spyOn(SnackbarContext, 'SnackbarProvider')
      .mockImplementation(() => ({ setOptions: jest.fn }));

    // Assert
    expect(result.current.showMessage).toEqual(expect.any(Function));
  });
});
