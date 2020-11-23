import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SnackbarContext, SnackbarProvider } from './snackbar.context';

describe('Snackbar context specs', () => {
  it('"open" should be "false" by default', () => {
    // Arrange
    const TestComponent: React.FC = () => {
      const { open } = React.useContext(SnackbarContext);
      return <>{open && <h1>Test heading</h1>}</>;
    };

    // Act
    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    const heading: HTMLElement = screen.queryByRole('heading', {
      name: 'Test heading',
    });

    // Assert
    expect(heading).toBeNull();
  });

  it('"setOpen" should change "open" value when called', () => {
    // Arrange
    const TestComponent: React.FC = () => {
      const { setOpen, open } = React.useContext(SnackbarContext);
      return (
        <>
          {open && <h1>Test</h1>}
          <button onClick={() => setOpen(true)}>Test button</button>
        </>
      );
    };

    // Act
    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    const button: HTMLElement = screen.getByRole('button');

    userEvent.click(button);

    const heading: HTMLElement = screen.getByRole('heading', {
      name: 'Test',
    });

    // Assert
    expect(heading).toBeInTheDocument();
  });

  it('"options" should have default values', () => {
    // Arrange
    const TestComponent: React.FC = () => {
      const { options } = React.useContext(SnackbarContext);
      return <>{options && <h1>Test heading</h1>}</>;
    };

    // Act
    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    const heading: HTMLElement = screen.getByRole('heading', {
      name: 'Test heading',
    });

    // Assert
    expect(heading).toBeInTheDocument();
  });

  it('"setOptions" should change "options" values when called', () => {
    // Arrange
    const TestComponent: React.FC = () => {
      const { options, setOptions } = React.useContext(SnackbarContext);
      return (
        <>
          {options && (
            <h1>
              {options.message} {options.variant}
            </h1>
          )}
          <button
            onClick={() =>
              setOptions({ message: 'Test message', variant: 'error' })
            }
          >
            Test button
          </button>
        </>
      );
    };

    // Act
    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    const button: HTMLElement = screen.getByRole('button');
    userEvent.click(button);

    const heading: HTMLElement = screen.getByRole('heading', {
      name: 'Test message error',
    });

    // Assert
    expect(heading).toBeInTheDocument();
  });

  it('"onClose" should change "open" value to false when called with no argument', () => {
    // Arrange
    const TestComponent: React.FC = () => {
      const { onClose, setOpen, open } = React.useContext(SnackbarContext);
      React.useEffect(() => setOpen(true));
      return (
        <>
          {open && <h1>Test</h1>}
          <button onClick={e => onClose()}>Test button</button>
        </>
      );
    };

    // Act
    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    // Act - Check if heading previously exists
    let heading: HTMLElement = screen.getByRole('heading', {
      name: 'Test',
    });
    expect(heading).toBeInTheDocument();

    const button: HTMLElement = screen.getByRole('button');

    userEvent.click(button);

    // Act - Check if heading exists after clicking
    heading = screen.queryByRole('heading', {
      name: 'Test',
    });

    // Assert
    expect(heading).toBeNull();
  });

  it('"onClose" should change "open" value to false when called with argument different from "clickaway"', () => {
    // Arrange
    const TestComponent: React.FC = () => {
      const { onClose, setOpen, open } = React.useContext(SnackbarContext);
      React.useEffect(() => setOpen(true));
      return (
        <>
          {open && <h1>Test</h1>}
          <button onClick={e => onClose(e, 'test argument')}>
            Test button
          </button>
        </>
      );
    };

    // Act
    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    // Act - Check if heading previously exists
    let heading: HTMLElement = screen.getByRole('heading', {
      name: 'Test',
    });
    expect(heading).toBeInTheDocument();

    const button: HTMLElement = screen.getByRole('button');

    userEvent.click(button);

    // Act - Check if heading exists after clicking
    heading = screen.queryByRole('heading', {
      name: 'Test',
    });

    // Assert
    expect(heading).toBeNull();
  });

  it('"onClose" should not change "open" value when called with argument "clickaway"', () => {
    // Arrange
    const TestComponent: React.FC = () => {
      const { onClose, setOpen, open } = React.useContext(SnackbarContext);
      React.useEffect(() => setOpen(true));
      return (
        <>
          {open && <h1>Test</h1>}
          <button onClick={e => onClose(e, 'clickaway')}>Test button</button>
        </>
      );
    };

    // Act
    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    // Act - Check if heading previously exists
    let heading: HTMLElement = screen.getByRole('heading', {
      name: 'Test',
    });
    expect(heading).toBeInTheDocument();

    const button: HTMLElement = screen.getByRole('button');

    userEvent.click(button);

    // Act - Check if heading exists after clicking
    heading = screen.getByRole('heading', {
      name: 'Test',
    });

    // Assert
    expect(heading).toBeInTheDocument();
  });
});
