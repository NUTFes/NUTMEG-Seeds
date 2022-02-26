import React, { useState } from 'react';
import Button from '@components/common/AddButton';
import s from './CardHeader.module.css';
import CurriculumAddModal from '@components/common/CurriculumAddModal';

interface Props {
  title: string;
  children?: React.ReactNode;
}

const CardHeader = (props: Props) => {
  return (
    <div className={s.HeaderContainer}>
      <div className={s.SplitLeftContainer}>
        <h2>{props.title}</h2>
      </div>
      <div className={s.SplitRightContainer}>{props.children}</div>
    </div>
  );
};

export default CardHeader;
