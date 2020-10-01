import * as React from 'react';
import { FooterLinkComponent } from './footer-link.component';
import * as classes from './footer.styles';

interface Props {}

export const Footer: React.FC<Props> = props => {
  const {} = props;

  return (
    <footer className={classes.footer}>
      <a
        className={classes.imgFooter}
        href="https://lemoncode.net/"
        target="blank"
      >
        <img
          className={classes.imgFooter}
          src="./assets/logo-lemon.png"
          alt="lemoncode"
        />
      </a>
      <ul className={classes.menuFooter}>
        <FooterLinkComponent href="about.html">About us</FooterLinkComponent>

        <FooterLinkComponent href="about.html">License</FooterLinkComponent>

        <FooterLinkComponent href="about.html">Contact</FooterLinkComponent>
      </ul>
      <span className={classes.copyFooter}>Create by LEMONCODE © 2020</span>
    </footer>
  );
};
