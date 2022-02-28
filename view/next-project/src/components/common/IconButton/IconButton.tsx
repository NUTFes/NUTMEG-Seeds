import React, { FC } from 'react';
import RightArrow from '@components/icons/RightArrow';
import s from './IconButton.module.css';

interface ButtonContentsProps {
  width?: string;
  height?: string;
  text?: string;
  onClick?: (event: any) => void;
  children: React.ReactNode;
}

const IconButton: FC<ButtonContentsProps> = (props) => {
  return (
    <>
      <button className={s.iconButton} onClick={props.onClick}>
        {props.children}
      </button>
    </>
  );
};

export default IconButton;
