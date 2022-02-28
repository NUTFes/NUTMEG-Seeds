import React from 'react';
import s from './RecordDetailHeader.module.css';
import Tag from '@components/common/Tag';

interface Props {
  children?: React.ReactNode;
  recordTitle: string;
  createDate: string;
  updateDate: string;
  curriculumTitle: string;
  teacher: string;
  user: string;
  skill: string;
}

const RecordDetailHeader = (props: Props) => {

  return (
    <div className={s.HeaderContainer}>
      <div className={s.TitleContainer}>{props.recordTitle}</div>
      <div className={s.TextContainer}>
        <div className={s.DescriptionContainer}>
          Title:{props.curriculumTitle}
        </div>
        <div className={s.DescriptionContainer}>
          Teacher:{props.teacher}
        </div>
        <div className={s.DescriptionContainer}>
          User:{props.user}
        </div>
      </div>
      <div className={s.TextContainer}>
        <div className={s.DescriptionContainer}>
          Create Date:{props.createDate}
        </div>
        <div className={s.DescriptionContainer}>
          Update Date:{props.updateDate}
        </div>
      </div>
      <div className={s.SkillContainer}>
        <Tag text={props.skill}/>
      </div>
    </div>
  );
};

export default RecordDetailHeader;
