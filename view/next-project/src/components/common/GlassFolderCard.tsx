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

function GlassFolderCard(props: CardContentsProps): JSX.Element {
  const GlassFolderTab = styled.div`
    width: 150px; /* 幅 */
    height: 100px;
    border-bottom: 100px 
    border-left: 25px 
    border-right: 25px 
    box-sizing: border-box;
    background: 'radial-gradient(ellipse at top left, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4))'} 
    border-top: solid 1px #505050;
  `;
  const GlassCardContainer = styled.div`
    width: ${props.width};
    height: ${props.height};
    padding: ${props.padding || '18px 22px'};
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

export default GlassFolderCard;
