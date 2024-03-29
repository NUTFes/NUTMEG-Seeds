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
  curriculumTitle?: string;
  chapterTitle?: string;
  teacher: string;
  user: string;
  skill?: Skill[];
}

const RecordDetailHeader = (props: Props) => {
  return (
    <div className={s.HeaderContainer}>
      <div className={s.TitleContainer}>{props.recordTitle}</div>
      <div className={s.TextContainer}>
        <div>
          <div className={s.DescriptionContainer}>Curriclum {props.curriculumTitle || 'No Curriculum'}</div>
          <div className={s.DescriptionContainer}>Chapter {props.chapterTitle || 'No Chapter'}</div>
        </div>
        <div>
          <div className={s.DescriptionContainer}>Teacher {props.teacher}</div>
          <div className={s.DescriptionContainer}>User {props.user}</div>
        </div>
      </div>
      <div className={s.TextContainer}>
        <div className={s.DescriptionContainer}>Create Date {props.createDate}</div>
        <div className={s.DescriptionContainer}>Update Date {props.updateDate}</div>
      </div>
      <div className={s.SkillContainer}>
        {props.skill && props.skill.map((skill) => (
          <Tag key={skill.id}>{skill.name}</Tag>
        ))}
        {!props.skill && <Tag>No Skill</Tag>}
      </div>
    </div>
  );
};

export default RecordDetailHeader;
