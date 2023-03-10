import React from 'react';
import s from './FlatCard.module.css';

interface FlatCardProps {
  align?: string;
  justify?: string;
  width?: string;
  height?: string;
  gap?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const FlatCard = (props: FlatCardProps) => {
  return (
    <>
      <div
        className={`${props.onClick ? s.ClickableFlatCardContainer : s.FlatCardContainer} ${s['align-' + props.align || 'end']} ${
          s['justify-' + props.align || 'end']
        } ${s[props.gap || 'none']} ${s['height-' + props.height || '100']} cursor-pointer `}
        onClick={props.onClick}
      >
        {props.children}
      </div>
    </>
  );
};

export default FlatCard;
