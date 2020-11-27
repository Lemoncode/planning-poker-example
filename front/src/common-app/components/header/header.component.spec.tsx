import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './header.component';

describe('Header component spec', () => {
  it('"HTML elements" should be displayed by default', () => {
    // Arrange

    // Act
    render(<Header />);

    const header: HTMLElement = screen.getByRole('banner');
    const image: HTMLElement = screen.getByRole('img');
    const heading: HTMLElement = screen.getByText('T-Shirt Planning Poker', {
      exact: false,
    });

    // Assert
    expect(header).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });

  it('"image" attributes should have expected values', () => {
    // Arrange
    const expectedSrcValue: string = 'http://localhost/assets/logo.png';
    const expectedAltValue: string = 'logo';

    // Act
    render(<Header />);

    const image = screen.getByRole('img') as HTMLImageElement;

    // Assert
    expect(image.src).toEqual(expectedSrcValue);
    expect(image.alt).toEqual(expectedAltValue);
  });
});
