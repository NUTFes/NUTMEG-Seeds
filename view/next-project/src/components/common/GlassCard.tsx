import React from 'react';
import styled from 'styled-components';

type CardContentsProps = {
  width?: string;
  height?: string;
  align?: string;
  justify?: string;
  gap?: string;
  padding?: string;
  children: React.ReactNode;
  background?: string;
};

function GlassCard(props: CardContentsProps): JSX.Element {
  const GlassCardContainer = styled.div`
    width: ${props.width};
    height: ${props.height};
    border-radius: var(--card-radius);
    padding: ${props.padding || '50px'};
    background: ${props.background ||
    'radial-gradient(ellipse at top left, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4))'};
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(4px);
    flex-grow: 1;
    display: flex;
    flex-flow: column;
    align-items: ${props.align || 'start'};
    justify-content: ${props.justify || 'start'};
    gap: ${props.gap || '0px'};
    font-size: 16px;
    flex: none;
  `;

  return (
    <>
      <GlassCardContainer>{props.children}</GlassCardContainer>
    </>
  );
}

export default GlassCard;
