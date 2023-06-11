import React, { FC } from 'react';
import Header from '@components/common/Header';
import s from './UsersLayout.module.css';
import styled from 'styled-components';

interface LayoutProps {
  children?: React.ReactNode;
}

const UsersLayout: FC<LayoutProps> = (props) => {
  return (
    <>
      <Header />
      <section>
        <main className={s.UserLayoutContainer}>{props.children}</main>
          <div>
            
          </div>
      </section>
    </>
  );
};







export default UsersLayout;
