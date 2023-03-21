import React from 'react';
import s from './ChapterDetailHeader.module.css';
import Tag from '@components/common/Tag';

interface Skill {
  id: number;
  name: string;
}

interface Props {
  children?: React.ReactNode;
  title: string;
  createDate: string;
  updateDate: string;
  skills: Skill[];
}

const ChapterDetailHeader = (props: Props) => {
  return (
    <div className={s.HeaderContainer}>
      <div className={s.TitleContainer}>{props.title}</div>
      <div className={s.TextContainer}>
        <div className={s.DescriptionContainer}>Create Date:{props.createDate}</div>
        <div className={s.DescriptionContainer}>Update Date:{props.updateDate}</div>
      </div>
      <div className={s.SkillContainer}>
        {props.skills.map((skill) => (
          <Tag key={skill.id}>{skill.name}</Tag>
        ))}
      </div>
    </div>
  );
};

export default ChapterDetailHeader;
