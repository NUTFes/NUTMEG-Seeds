import React from 'react';
import styled from 'styled-components';

type CardContentsProps = {
  children: React.ReactNode;
};

function FlatCard({ children }: CardContentsProps): JSX.Element {
  const FlatCardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    background-color: var(--accent-0);
    border-radius: var(--card-radius);
    padding: 100px;
    margin-bottom: 50px;
  `;

  return (
    <>
      <FlatCardContainer>{children}</FlatCardContainer>
    </>
  );
}

export default FlatCard;
