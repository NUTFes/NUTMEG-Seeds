import React from 'react';
import styled from 'styled-components';
import Add from '@components/icons/Add';

interface ButtonContentsProps {
  width?: string;
  height?: string;
  text?: string;
  onClick: (event: any) => void;
  children?: React.ReactNode;
};

function TestButton(props: ButtonContentsProps): JSX.Element {
  const ButtonContainer = styled.button`
    background: radial-gradient(var(--button-primary), var(--button-secondary));
    width: ${props.width || '40px'};
    height: ${props.height || '40px'};
    border-radius: 50%;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(4px);
    text-align: center;
    font-size: 14px;
    color: var(--accent-0);
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    &:active {
      box-shadow: 0 0px 0px rgba(0, 0, 0, 0.25);
    }
  `;

  return (
    <>
      <ButtonContainer onClick={props.onClick}>
        {props.children}
        {props.text}
        <Add height={24} width={24} color='var(--accent-0)' />
      </ButtonContainer>
    </>
  );
}

export default TestButton;
