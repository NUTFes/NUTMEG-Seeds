import React from 'react';
import s from './ListPageTitle.module.css';

interface Props {
  title: string;
}

const ListPageTitle = (props: Props) => {
  return (
    <div className={s.modalContainer}>
      {props.title}
    </div>
  );
};

export default ListPageTitle;
