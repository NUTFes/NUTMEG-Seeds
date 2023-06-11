import React, { FC } from 'react';
import RightArrow from '@components/icons/RightArrow';
import s from './TextButton.module.css';

interface ButtonContentsProps {
  width?: string;
  height?: string;
  text?: string;
  onClick: (event: any) => void;
  children: React.ReactNode;
}

const TextButton: FC<ButtonContentsProps> = (props) => {
  return (
    <>
      <button className={s.textButton} onClick={props.onClick}>
        {props.children}
        {props.text}
        <RightArrow height={16} width={16} color='var(--accent-0)' />
      </button>
    </>
  );
};

export default TextButton;
