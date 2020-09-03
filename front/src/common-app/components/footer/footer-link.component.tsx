import * as React from 'react';
import * as classes from './footer.styles';

interface Props {
  href: string;
}

export const FooterLinkComponent: React.FC<Props> = props => {
  const { href, children } = props;

  return (
    <li className={'itemMenuFooter'}>
      <a className={'linkMenuFooter'} href={href}>
        {children}
      </a>
    </li>
  );
};
