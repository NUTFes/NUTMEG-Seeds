import React from 'react';
import s from './SkillDetailHeader.module.css';
import Tag from '@components/common/Tag';

interface Props {
  children?: React.ReactNode;
  skillName: string;
}

const SkillDetailHeader = (props: Props) => {
  return (
    <div className={s.HeaderContainer}>
      <div className={s.TitleContainer}>{props.skillName}</div>
    </div>
  );
};

export default SkillDetailHeader;
