import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@components/common/AddButton';
import s from './ListHeader.module.css';
import ProjectAddModal from '@components/common/ProjectAddModal';
import RecordAddModal from '@components/common/RecordAddModal';
import SkillAddModal from '@components/common/SkillAddModal';
import CategoryAddModal from '@components/common/CategoryAddModal';
import { useUI } from '@components/ui/context';
import ChapterAddModal from '@components/common/ChapterAddModal';

interface Skill {
  id: string;
  name: string;
}

interface Project {
  id: number;
  name: string;
  detail: string;
  icon_name: string;
  github: string;
  remark: string;
}

interface NewSkill {
  id: number;
  name: string;
  category_id: number;
  category_name: string;
  created_at: string;
}

interface newCategory {
  id: number;
  name: string;
  created_at: string;
}

interface Props {
  title: string;
  setRecords?: any;
  newSkills?: NewSkill[];
  setNewSkills?: any;
  setCurriculums?: any;
  newCategories?: newCategory[];
  setNewCategories?: any;
}

const ListHeader = (props: Props) => {
  const { setModalView, openModal } = useUI();

  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: '', detail: '', icon_name: '', github: '', remark: '' },
  ]);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const router = useRouter();

  const AddModalUI = (isOpenAddModal: boolean) => {
    switch (router.pathname) {
      case '/records':
        return (
          <>
            <Button onClick={() => setIsOpenAddModal(!isOpenAddModal)} />
            {isOpenAddModal && (
              <RecordAddModal isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} setNewRecords={props.setRecords} />
            )}
          </>
        );
      case '/projects':
        return (
          <Button onClick={() => setIsOpenAddModal(!isOpenAddModal)}>
            {isOpenAddModal && (
              <ProjectAddModal
                isOpen={isOpenAddModal}
                setIsOpen={setIsOpenAddModal}
                projects={projects}
                setProjects={setProjects}
              />
            )}
          </Button>
        );
      case '/skills':
        return (
          <Button onClick={() => setIsOpenAddModal(!isOpenAddModal)}>
            {isOpenAddModal && (
              <SkillAddModal
                isOpen={isOpenAddModal}
                setIsOpen={setIsOpenAddModal}
                newSkills={props.newSkills}
                setNewSkills={props.setNewSkills}
              />
            )}
          </Button>
        );
      // curriculumとchapterのみモーダルの再レンダリング対策しているためこのような記述にしている
      case '/curriculums':
        return (
          <Button
            onClick={() => {
              setModalView('CURRICULUM_ADD_MODAL');
              openModal();
            }}
          />
        );
      case '/curriculums/[slug]':
        return (
          <Button
            onClick={() => {
              setModalView('CHAPTER_ADD_MODAL');
              openModal();
            }}
          />
        );
      case '/categories':
        return (
          <>
            <CategoryAddModal
              isOpen={isOpenAddModal}
              setIsOpen={setIsOpenAddModal}
              setNewCategories={props.setNewCategories}
              newCategories={props.newCategories}
            />
          </>
        );
    }
  };

  return (
    <div className={s.HeaderContainer}>
      <div className={s.SplitLeftContainer}>
        <h1>{props.title}</h1>
      </div>
      <div className={s.SplitRightContainer}>{AddModalUI(isOpenAddModal)}</div>
    </div>
  );
};

export default ListHeader;
