import React from 'react';
import Header from '@components/common/Header';
import styled from 'styled-components';

type LayoutProps = {
  children: React.ReactNode;
};

function LoginLayout({ children }: LayoutProps): JSX.Element {
  const Container = styled.main`
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    padding: 50px;
  `;

  return (
    <>
      <Container>{children}</Container>
    </>
  );
}

export default LoginLayout;
