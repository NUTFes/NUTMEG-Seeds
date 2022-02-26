import React, { useState } from 'react';
import s from './DetailHeader.module.css';
import Tag from '@components/common/Tag';

interface Curriculum {
  id: number;
  title: string;
  content: string;
  homework: string;
  skill_id: number;
  created_at: string;
  updated_at: string;
}

interface Props {
  children?: React.ReactNode;
  skill: string;
  curriculum: Curriculum;
}

const DetailHeader = (props: Props) => {
  return (
    <div className={s.HeaderContainer}>
      <div className={s.TitleContainer}>{props.curriculum.title}</div>
      <div className={s.SkillContainer}>
        <Tag text={props.skill} />
      </div>
    </div>
  );
};

export default DetailHeader;
