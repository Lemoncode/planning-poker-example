import React from 'react';
import { render, screen } from '@testing-library/react';
import { SocketContext, SocketProvider } from './socket.context';

describe('Socket context specs', () => {
  it('"socket" should be null by default', () => {
    // Arrange
    const TestComponent: React.FC = () => {
      const { socket } = React.useContext(SocketContext);

      return <>{socket === null && <h1>Test</h1>}</>;
    };

    // Act
    render(
      <SocketProvider>
        <TestComponent />
      </SocketProvider>
    );

    const heading: HTMLElement = screen.getByRole('heading', { name: 'Test' });

    // Assert
    expect(heading).toBeInTheDocument();
  });

  it('"setSocket" should be a function by default', () => {
    // Arrange
    const TestComponent: React.FC = () => {
      const { setSocket } = React.useContext(SocketContext);
      const isFunction = fn =>
        fn && {}.toString.call(fn) === '[object Function]';
      return <>{isFunction(setSocket) && <h1>Test</h1>}</>;
    };

    // Act
    render(
      <SocketProvider>
        <TestComponent />
      </SocketProvider>
    );

    const heading: HTMLElement = screen.getByRole('heading', { name: 'Test' });

    // Assert
    expect(heading).toBeInTheDocument();
  });
});
