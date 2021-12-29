import React from 'react';
import styled from 'styled-components';

type CardContentsProps = {
  children: React.ReactNode;
};

function FlatCard({ children }: CardContentsProps): JSX.Element {
  const FlatCardContainer = styled.div`
    background-color: var(--accent-0);
    min-height: 1000px;
    min-width: 800px;
    max-width: 1200px;
    border-radius: var(--card-radius);
    padding: 50px;
    margin-bottom: 50px;
  `;

  return (
    <>
      <FlatCardContainer>{children}</FlatCardContainer>
    </>
  );
}

export default FlatCard;
