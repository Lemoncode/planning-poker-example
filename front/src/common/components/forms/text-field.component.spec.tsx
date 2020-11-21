import React from 'react';
import { Formik, Form } from 'formik';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    const input: HTMLElement = screen.getByRole('textbox');

    // Assert
    expect(input).toBeInTheDocument();
  });

  it('"input" should change value when typing', () => {
    // Arrange

    // Act
    renderWithFormik(<TextFieldComponent name={name} />, { name: 'test name' });

    const input: HTMLElement = screen.getByRole('textbox');

    userEvent.type(input, 'test input text');

    // Assert
    expect(input).toHaveValue('test input text');
  });
});
