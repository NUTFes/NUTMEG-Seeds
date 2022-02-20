import React, { FC } from 'react';
import Header from '@components/common/Header';
import s from './MainLayout.module.css';

interface LayoutProps {
  children?: React.ReactNode;
}

const MainLayout: FC<LayoutProps> = (props) => {
  return (
    <>
      <Header />
      <main className={s.mainLayoutContainer}>{props.children}</main>
    </>
  );
};

export default MainLayout;
