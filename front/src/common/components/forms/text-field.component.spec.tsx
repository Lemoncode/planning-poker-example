import React from 'react';
import { Formik, useField } from 'formik';
import { render, screen } from '@testing-library/react';
import { TextFieldComponent } from './text-field.component';

describe('textfield component specs', () => {
  const renderWithFormik = (component, initialValues) => ({
    ...render(
      <Formik initialValues={initialValues} onSubmit={console.log}>
        {() => component}
      </Formik>
    ),
  });

  it('', () => {
    // Arrange

    // Act

    renderWithFormik(<TextFieldComponent />, { name: 'test name' });

    const textarea = screen.getByRole('textbox');

    // Assert
    expect(textarea).toBeInTheDocument();
  });
});
