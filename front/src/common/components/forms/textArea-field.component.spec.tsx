import React from 'react';
import { Formik, Form } from 'formik';
import { render, screen } from '@testing-library/react';
import { TextFieldComponent } from './text-field.component';

describe('textfield component specs', () => {
  const renderWithFormik = (component, initialValues) => ({
    ...render(
      <Formik initialValues={initialValues} onSubmit={console.log}>
        {() => <Form>{component}</Form>}
      </Formik>
    ),
  });

  it('"input" should be displayed by default', () => {
    // Arrange

    // Act
    renderWithFormik(<TextFieldComponent name={name} />, { name: 'test name' });

    const input = screen.getByRole('textbox');

    // Assert
    expect(input).toBeInTheDocument();
  });
});
