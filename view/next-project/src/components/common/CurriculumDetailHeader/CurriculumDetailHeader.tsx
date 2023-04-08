import React, { useState } from 'react';
import s from './CurriculumDetailHeader.module.css';
import Tag from '@components/common/Tag';
import DeleteButton from '@components/common/DeleteButton';
import EditButton from '@components/common/EditButton';
import Row from '@components/layout/RowLayout';
import { useUI } from '@components/ui/context';
import { formatDate } from '@utils/format_date';
import CurriculumEditModal from '@components/common/CurriculumEditModal/CurriculumEditModal';

interface Curriculum {
  id: number;
  title: string;
  skill_ids: number[];
  graduation_assignment: string;
  created_at: string;
  updated_at: string;
}

interface Skill {
  id: number;
  name: string;
}

interface Props {
  curriculum: Curriculum;
  skills: Skill[];
}

const CurriculumDetailHeader = (props: Props) => {
  const { openModal, setModalView } = useUI();
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);

  const onOpen = () => {
    setIsOpenEditModal(true);
  };
  const onClose = () => {
    setIsOpenEditModal(false);
  };

  return (
    <>
      <div className={s.HeaderContainer}>
        <Row gap='3rem' justify='end'>
          <EditButton onClick={onOpen} />
          {isOpenEditModal && <CurriculumEditModal curriculum={props.curriculum} onClose={onClose} />}
          <DeleteButton
            onClick={() => {
              setModalView('CURRICULUM_DELETE_MODAL');
              openModal();
            }}
          />
        </Row>
        <div className={s.TitleContainer}>{props.curriculum.title}</div>
        <div className={s.TextContainer}>
          <div className={s.DescriptionContainer}>Create Date:{formatDate(props.curriculum.created_at)}</div>
          <div className={s.DescriptionContainer}>Update Date:{formatDate(props.curriculum.updated_at)}</div>
        </div>
        <div className={s.SkillContainer}>
          {props.skills.map((skill) => (
            <Tag key={skill.id}>{skill.name}</Tag>
          ))}
        </div>
      </div>
    </>
  );
};

export default CurriculumDetailHeader;
