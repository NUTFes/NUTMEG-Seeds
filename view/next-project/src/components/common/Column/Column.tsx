import React from 'react';
import s from './Column.module.css';

interface ColumnProps {
  align?: string;
  justify?: string;
  margin?: string;
  children?: React.ReactNode;
}

const Column = (props: ColumnProps) => {
  return (
    <div
      className={`${s.ColumnContainer} ${s['align-' + props.align || 'start']} ${
        s['justify-' + props.justify || 'start']
      } ${s['margin-' + props.margin]}`}
    >
      {props.children}
    </div>
  );
};

export default Column;
