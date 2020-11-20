import React from 'react';
import { render, screen } from '@testing-library/react';
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

  it('"nickname should be an empty string by default"', () => {
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
});
