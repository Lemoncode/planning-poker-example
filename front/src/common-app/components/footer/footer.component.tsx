import * as React from 'react';
import * as classes from './footer.styles';

interface Props {}

export const Footer: React.FC<Props> = props => {
  const {} = props;

  return (
    <footer className={classes.footer}>
      <img
        className={classes.imgFooter}
        src="./src/assets/logo-lemon.png"
        alt="lemoncode"
      />
      <ul className={classes.menuFooter}>
        <li className={classes.itemMenuFooter}>
          <a className={classes.linkMenuFooter} href="#">
            Aviso legal
          </a>
        </li>
        <li className={classes.itemMenuFooter}>
          <a className={classes.linkMenuFooter} href="#">
            Privacidad
          </a>
        </li>
        <li className={classes.itemMenuFooter}>
          <a className={classes.linkMenuFooter} href="#">
            Contactar
          </a>
        </li>
      </ul>
      <span className={classes.copyFooter}>Create by LEMONCODE © 2020</span>
    </footer>
  );
};
