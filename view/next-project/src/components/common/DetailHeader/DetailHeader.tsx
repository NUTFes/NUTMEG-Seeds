import React, { useState } from 'react';
import s from './DetailHeader.module.css';
import Tag from '@components/common/Tag';

interface Skill {
  id: number;
  name: string;
}

interface Curriculum {
  id: number;
  title: string;
  content: string;
  homework: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  children?: React.ReactNode;
  skills: Skill[];
  curriculum: Curriculum;
}

const DetailHeader = (props: Props) => {
  return (
    <div className={s.HeaderContainer}>
      <div className={s.TitleContainer}>{props.curriculum.title}</div>
      <div className={s.SkillContainer}>
        {props.skills.map((skill) => (
          <Tag key={skill.id}>{skill.name}</Tag>
        ))}
      </div>
    </div>
  );
};

export default DetailHeader;
