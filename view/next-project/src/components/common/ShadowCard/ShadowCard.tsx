import React from 'react';
import s from './ShadowCard.module.css';

interface ShadowCardProps {
  align?: string;
  justify?: string;
  width?: string;
  height?: string;
  gap?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const ShadowCard = (props: ShadowCardProps) => {
  return (
    <div
      className={`${s.ShadowCardContainer} ${s['align-' + props.align || 'end']} ${
        s['justify-' + props.align || 'end']
      } ${s[props.gap || 'none']} ${s['height-' + props.height || '100']} cursor-pointer `}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default ShadowCard;
