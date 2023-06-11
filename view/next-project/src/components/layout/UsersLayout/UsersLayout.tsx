import React, { FC } from 'react';
import Header from '@components/common/Header';
import s from './UsersLayout.module.css';
import styled from 'styled-components';

interface LayoutProps {
  children?: React.ReactNode;
}

const UsersLayout: FC<LayoutProps> = (props) => {
  const MemberHeaderContainer = styled.div`
    height: 150px;
    position: fixed;
    z-index: 8;
    width: fit-content;
    margin-top: -90px;
    margin-left: 0px;
  `;
  const MemberFooterContainer = styled.div`
    height: 200px;
    position: fixed;
    z-index: 8;
    width: fit-content;
    bottom: 0px;
    margin-left: 0px;
  `;
  return (
    <>
      <Header />
      <MemberHeaderContainer>
        <img src='MemberHeader.svg' />
      </MemberHeaderContainer>
      <section>
        <main className={s.UserLayoutContainer}>{props.children}</main>
      </section>
      <MemberFooterContainer>
        <img src='MemberFooter.svg' />
      </MemberFooterContainer>
    </>
  );
};







export default UsersLayout;
