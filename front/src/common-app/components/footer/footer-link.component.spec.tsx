import React from 'react';
import { render, screen } from '@testing-library/react';
import { FooterLinkComponent } from './footer-link.component';

describe('Footer link component spec', () => {
  it('"list item" and "link" should be displayed by default', () => {
    // Arrange
    interface Props {
      href: string;
    }
    const props: Props = {
      href: 'hrefTest',
    };

    // Act
    render(<FooterLinkComponent {...props} />);

    const listItem: HTMLElement = screen.getByRole('listitem');
    const link: HTMLElement = screen.getByRole('link');

    // Assert
    expect(listItem).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });

  it('"children" must be displayed if there is any', () => {
    // Arrange
    interface Props {
      href: string;
    }
    const props: Props = {
      href: 'hrefTest',
    };
    const childrenText: string = 'test children';

    // Act
    render(
      <FooterLinkComponent {...props}>
        <span>{childrenText}</span>
      </FooterLinkComponent>
    );

    const testChildren: HTMLSpanElement = screen.getByText(childrenText);

    // Assert
    expect(testChildren).toBeInTheDocument();
  });

  it('"href" link attribute should have same value as received prop data - Absolute URL', () => {
    // Arrange
    interface Props {
      href: string;
    }
    const props: Props = {
      href: 'https://www.test.com/',
    };

    // Act
    render(<FooterLinkComponent {...props} />);

    const link = screen.getByRole('link') as HTMLLinkElement;

    // Assert
    expect(link.href).toEqual(props.href);
  });

  it('"href" link attribute should have same value as received prop data - Relative URL', () => {
    // Arrange
    interface Props {
      href: string;
    }
    const props: Props = {
      href: 'test.com/',
    };
    const localHostTest: string = 'http://localhost/';

    // Act
    render(<FooterLinkComponent {...props} />);

    const link = screen.getByRole('link') as HTMLLinkElement;

    // Assert
    expect(link.href).toEqual(`${localHostTest}${props.href}`);
  });
});
