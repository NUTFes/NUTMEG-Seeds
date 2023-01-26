import React, { FC } from 'react';
import s from './AnimationButton.module.css';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const AnimationButton: FC<ButtonProps> = (props) => {
  return (
    <>
      <button className={s.button} onClick={props.onClick}>
        <span>{props.children}</span>
      </button>
    </>
  );
};

export default AnimationButton;
