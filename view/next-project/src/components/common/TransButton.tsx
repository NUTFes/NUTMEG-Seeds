import React from 'react';
import styled from 'styled-components';
import RightArrow from '@components/icons/RightArrow';

type ButtonContentsProps = {
  width?: string;
  height?: string;
  text?: string;
  children: React.ReactNode;
};

function Button(props: ButtonContentsProps): JSX.Element {
  const ButtonContainer = styled.button`
    background: radial-gradient(
      ellipse at top left,
      var(--button-primary),
      var(--button-secondary)
    );
    width: ${props.width};
    height: ${props.height};
    border-radius: var(--button-radius);
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(4px);
    text-align: center;
    font-size: 14px;
    color: var(--accent-0);
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return (
    <>
      <ButtonContainer>
        {props.children}
        {props.text}
        <RightArrow height={16} width={16} color='--secondary' />
      </ButtonContainer>
    </>
  );
}

export default Button;
