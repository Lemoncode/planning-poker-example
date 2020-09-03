import * as React from 'react';
import { FooterLinkComponent } from './footer-link.component';
import * as classes from './footer.styles';

interface Props {}

export const Footer: React.FC<Props> = props => {
  const {} = props;

  return (
    <footer className={classes.footer}>
      <img
        className={'imgFooter'}
        src="./src/assets/logo-lemon.png"
        alt="lemoncode"
      />
      <ul className={'menuFooter'}>
        <FooterLinkComponent href="#">Aviso legal</FooterLinkComponent>

        <FooterLinkComponent href="#">Privacidad</FooterLinkComponent>

        <FooterLinkComponent href="#">Contactar</FooterLinkComponent>
      </ul>
      <span className={'copyFooter'}>Create by LEMONCODE © 2020</span>
    </footer>
  );
};
