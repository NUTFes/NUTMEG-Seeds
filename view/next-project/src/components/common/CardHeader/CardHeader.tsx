import React from 'react';
import s from './CardHeader.module.css';

interface Props {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const CardHeader = (props: Props) => {
  return (
    <div className={s.HeaderContainer}>
      <div className={s.SplitLeftContainer}>
        <h1>{props.title}</h1>
        <h2>{props.subtitle}</h2>
      </div>
      <div className={s.SplitRightContainer}>{props.children}</div>
    </div>
  );
};

export default CardHeader;
