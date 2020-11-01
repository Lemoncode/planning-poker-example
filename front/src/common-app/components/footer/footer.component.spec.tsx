import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './footer.component';

describe('Footer component spec', () => {
  it('"HTML elements" should be displayed by default', () => {
    // Arrange

    // Act
    render(<Footer />);

    const footer: HTMLElement = screen.getByRole('contentinfo');
    const logoImage: HTMLElement = screen.getByRole('img');
    const list: HTMLElement = screen.getByRole('list');
    const copyText: HTMLElement = screen.getByText(
      'Create by LEMONCODE © 2020'
    );
    const listItem = screen.getAllByRole('listitem');
    const links = screen.getAllByRole('link');

    // Assert
    expect(footer).toBeInTheDocument();
    expect(logoImage).toBeInTheDocument();
    expect(list).toBeInTheDocument();
    expect(copyText).toBeInTheDocument();
    expect(listItem).toHaveLength(3);
    expect(links).toHaveLength(4);
  });

  it('"first link" attributes should have expected values', () => {
    // Arrange
    const expectedHrefValue: string = 'https://lemoncode.net/';
    const expectedTargetValue: string = 'blank';

    // Act
    render(<Footer />);

    const firstLink = screen.getAllByRole('link')[0] as HTMLLinkElement;

    // Assert

    expect(firstLink.href).toEqual(expectedHrefValue);
    expect(firstLink.target).toEqual(expectedTargetValue);
  });

  it('"img" attributes should have expected values', () => {
    // Arrange
    const expectedSrcValue: string = 'http://localhost/assets/logo-lemon.png';
    const expectedAltValue: string = 'lemoncode';

    // Act
    render(<Footer />);

    const image = screen.getByRole('img') as HTMLImageElement;

    // Assert

    expect(image.src).toEqual(expectedSrcValue);
    expect(image.alt).toEqual(expectedAltValue);
  });

  it('"links" inside list items attributes should have expected values', () => {
    // Arrange
    const expectedHrefValue: string = 'http://localhost/about.html';
    const expectedFirstLinkText: string = 'About us';
    const expectedSecondLinkText: string = 'License';
    const expectedThirdLinkText: string = 'Contact';

    // Act
    render(<Footer />);

    const firstLink = screen.getAllByRole('link')[1] as HTMLLinkElement;
    const secondLink = screen.getAllByRole('link')[2] as HTMLLinkElement;
    const thirdLink = screen.getAllByRole('link')[3] as HTMLLinkElement;

    // Assert

    expect(firstLink.href).toEqual(expectedHrefValue);
    expect(secondLink.href).toEqual(expectedHrefValue);
    expect(thirdLink.href).toEqual(expectedHrefValue);
    expect(firstLink.innerHTML).toEqual(expectedFirstLinkText);
    expect(secondLink.innerHTML).toEqual(expectedSecondLinkText);
    expect(thirdLink.innerHTML).toEqual(expectedThirdLinkText);
  });
});
