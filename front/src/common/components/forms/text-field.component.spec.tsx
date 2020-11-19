import React from 'react';
import { useField } from 'formik';
import * as Formik from 'formik';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { TextFieldComponent } from './text-field.component';

describe('textfield component specs', () => {
  it('', () => {
    // Arrange

    // Act
    // const {result} = renderHook(() => useField('test name'));
    // jest.spyOn(Formik, 'useField').mockReturnValue({});

    render(<TextFieldComponent />);

    const textarea = screen.getByRole('textbox');

    // Assert
    expect(textarea).toBeInTheDocument();
  });
});
