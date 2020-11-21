import React from 'react';
import { Formik, Form } from 'formik';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextAreaComponent } from './textArea-field.component';

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
    renderWithFormik(<TextAreaComponent name={name} />, { name: 'test name' });

    const textarea: HTMLElement = screen.getByRole('textbox');

    // Assert
    expect(textarea).toBeInTheDocument();
  });

  it('"input" should change value when typing', () => {
    // Arrange

    // Act
    renderWithFormik(<TextAreaComponent name={name} />, { name: 'test name' });

    const textarea: HTMLElement = screen.getByRole('textbox');

    userEvent.type(textarea, 'test input text');

    // Assert
    expect(textarea).toHaveValue('test input text');
  });
});
