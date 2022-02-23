import React, { useState } from 'react';
import s from './DetailHeader.module.css';
import GlassCard from "@components/common/GlassCard";
import Button from "@components/common/TestButton";

interface Curriculum {
    id: number;
    title: string;
    content: string;
    homework: string;
    skill_id: number;
    created_at: string;
    updated_at: string;
}

interface Skill {
  id: number;
  name: string;
  detail: string;
  category_id: number;
}

interface Props {
  children?: React.ReactNode;
  skills: Skill[];
  curriculum: Curriculum[];
}

const DetailHeader = (props: Props) => {
  return (
    <div className={s.HeaderContainer}>
      <div className={s.TitleContainer}>
          {props.curriculum.title}
      </div>
        <div className={s.SkillContainer}>
            <GlassCard children={props.skills[0].name} padding='5px 10px' />
            <Button children={props.skills[0].name} padding='5px 10px' />
        </div>
    </div>
  );
};

export default DetailHeader;
