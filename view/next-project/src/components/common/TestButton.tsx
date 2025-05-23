import React from 'react';
import styled from 'styled-components';
import RightArrow from '@components/icons/RightArrow';

type ButtonContentsProps = {
  width?: string;
  height?: string;
  text?: string;
  onClick?: (event: any) => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  children: React.ReactNode;
};

function TestButton(props: ButtonContentsProps): JSX.Element {
  const ButtonContainer = styled.button`
    background: ${props.disabled 
      ? 'linear-gradient(ellipse at top left, #ccc, #999)' 
      : 'radial-gradient(ellipse at top left, var(--button-primary), var(--button-secondary))'};
    width: ${props.width || '150px'};
    height: ${props.height || '40px'};
    border-radius: var(--button-radius);
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(4px);
    text-align: center;
    font-size: 14px;
    color: ${props.disabled ? '#666' : 'var(--accent-0)'};
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: ${props.disabled ? 'not-allowed' : 'pointer'};
    opacity: ${props.disabled ? 0.6 : 1};
    &:active {
      box-shadow: ${props.disabled ? '0 2px 2px rgba(0, 0, 0, 0.25)' : '0 0px 0px rgba(0, 0, 0, 0.25)'};
    }
  `;

  return (
    <ButtonContainer 
      onClick={props.disabled ? undefined : props.onClick} 
      type={props.type}
      disabled={props.disabled}
    >
      {props.children}
      {props.text}
      <RightArrow height={16} width={16} color={props.disabled ? '#666' : 'var(--accent-0)'} />
    </ButtonContainer>
  );
}

export default TestButton;
