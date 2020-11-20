import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthContext, AuthProvider } from './auth.context';

describe('Auth context specs', () => {
  it('"nickname" should be an empty string by default', () => {
    // Arrange
    const TestComponent: React.FC = () => {
      const { nickname } = React.useContext(AuthContext);
      return <>{nickname === '' && <h1>Test</h1>}</>;
    };

    // Act
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const heading: HTMLElement = screen.getByRole('heading', { name: 'Test' });

    // Assert
    expect(heading).toBeInTheDocument();
  });

  it('"setNickname" should be an empty string by default', () => {
    // Arrange
    const TestComponent: React.FC = () => {
      const { setNickname } = React.useContext(AuthContext);
      const isFunction = fn =>
        fn && {}.toString.call(fn) === '[object Function]';
      return <>{isFunction(setNickname) && <h1>Test</h1>}</>;
    };

    // Act
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const heading: HTMLElement = screen.getByRole('heading', { name: 'Test' });

    // Assert
    expect(heading).toBeInTheDocument();
  });

  it('"nickname" should be an empty string by default', () => {
    // Arrange
    const TestComponent: React.FC = () => {
      const { setNickname } = React.useContext(AuthContext);
      const isFunction = fn =>
        fn && {}.toString.call(fn) === '[object Function]';
      return <>{isFunction(setNickname) && <h1>Test</h1>}</>;
    };

    // Act
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const heading: HTMLElement = screen.getByRole('heading', { name: 'Test' });

    // Assert
    expect(heading).toBeInTheDocument();
  });

  it('"setNickname" should change value of "nickname"', () => {
    // Arrange
    const TestComponent: React.FC = () => {
      const { setNickname, nickname } = React.useContext(AuthContext);
      return (
        <>
          <button onClick={() => setNickname('New Test Value')}></button>
          {nickname === 'New Test Value' && <h1>Test</h1>}
        </>
      );
    };

    // Act
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const button: HTMLElement = screen.getByRole('button');

    act(() => {
      userEvent.click(button);
    });

    const heading: HTMLElement = screen.getByRole('heading', {
      name: 'Test',
    });

    // Assert
    expect(heading).toBeInTheDocument();
  });
});
