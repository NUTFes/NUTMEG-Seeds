import React from 'react';
import styled from 'styled-components';

type LayoutProps = {
  align?: string;
  justify?: string;
  marginBottom?: string;
  children: React.ReactNode;
};

function RowLayout(props: LayoutProps): JSX.Element {
  const Container = styled.div`
    width: 100%;
    flex-wrap: wrap;
    gap: 100px 100px;
    display: flex;
    align-items: ${props.align || 'center'};
    justify-content: ${props.justify || 'center'};
    margin-bottom: ${props.marginBottom || '0px'};
  `;

  return (
    <>
      <Container>{props.children}</Container>
    </>
  );
}

export default RowLayout;
