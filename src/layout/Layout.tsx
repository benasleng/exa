import React, { Fragment, ReactNode } from 'react';
import Header from '../components/Header/Header';

type BaseLayoutProps = {
  children: ReactNode;
};

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
};

export default BaseLayout;
