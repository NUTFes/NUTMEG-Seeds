import React, { FC } from 'react';
import s from './Tag.module.css';

interface ButtonContentsProps {
  width?: string;
  height?: string;
  text?: string;
  children?: React.ReactNode;
}

const Tag: FC<ButtonContentsProps> = (props)=> {
  return (
    <>
      <button className={s.Tag}>
        {props.children}
        {props.text}
      </button>
    </>
  );
};

export default Tag;
