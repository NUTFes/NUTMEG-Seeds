import React from 'react';
import Header from '@components/common/Header';
import styled from 'styled-components';

type LayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: LayoutProps): JSX.Element {
  const Container = styled.main`
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 100px 200px;
    margin-top: 60px;
  `;

  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
}

export default MainLayout;
