import React from 'react';
import styled from 'styled-components';

type CardContentsProps = {
  width?: string;
  height?: string;
  children: React.ReactNode;
};

function FlatCard(props: CardContentsProps): JSX.Element {
  const FlatCardContainer = styled.div`
    width: ${props.width};
    height: ${props.height};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    background-color: var(--accent-0);
    border-radius: var(--card-radius);
    padding: 50px;
    font-size: 14px;
    position: relative;
  `;

  return (
    <>
      <FlatCardContainer>{props.children}</FlatCardContainer>
    </>
  );
}

export default FlatCard;
