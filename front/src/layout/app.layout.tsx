import React from 'react';
import { CenteredLayout } from './centered.layout';
import { Header, Footer } from 'common-app/components';

export const AppLayout: React.FunctionComponent = props => {
  const { children } = props;
  return (
    <CenteredLayout>
      <Header />
      {children}
      <Footer />
    </CenteredLayout>
  );
};
