import React from "react";
import styled from "styled-components";

type CardContentsProps = {
  width?: string
  height?: string
  children: React.ReactNode;
};

function GlassCard(props: CardContentsProps): JSX.Element {
  const GlassCardContainer = styled.div`
    background-color: var(--accent-0);
    width: ${props.width};
    height: ${props.height};
    min-height: 300px;
    min-width: 300px;
    border-radius: var(--card-radius);
    padding: 50px;
    margin-bottom: 50px;
    background: radial-gradient(
      ellipse at top left,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.4)
    );
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(4px);
    text-align: center;
    font-size: 24px;
  `;

  return (
    <>
      <GlassCardContainer>{ props.children }</GlassCardContainer>
    </>
  );
}

export default GlassCard;
