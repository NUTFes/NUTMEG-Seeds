import React from 'react';
import s from './RecordDetailHeader.module.css';
import Tag from '@components/common/Tag';

interface Skill {
  id: number;
  name: string;
}

interface Props {
  children?: React.ReactNode;
  recordTitle: string;
  createDate: string;
  updateDate: string;
  curriculumTitle: string;
  teacher: string;
  user: string;
  skill: Skill[];
}

const RecordDetailHeader = (props: Props) => {
  return (
    <div className={s.HeaderContainer}>
      <div className={s.TitleContainer}>{props.recordTitle}</div>
      <div className={s.TextContainer}>
        <div className={s.DescriptionContainer}>Title:{props.curriculumTitle}</div>
        <div className={s.DescriptionContainer}>Teacher:{props.teacher}</div>
        <div className={s.DescriptionContainer}>User:{props.user}</div>
      </div>
      <div className={s.TextContainer}>
        <div className={s.DescriptionContainer}>Create Date:{props.createDate}</div>
        <div className={s.DescriptionContainer}>Update Date:{props.updateDate}</div>
      </div>
      <div className={s.SkillContainer}>
        {props.skill.map((skill) => (
          <Tag>{skill.name}</Tag>
        ))}
      </div>
    </div>
  );
};

export default RecordDetailHeader;
