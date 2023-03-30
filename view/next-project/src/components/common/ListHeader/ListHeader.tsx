import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AddButton from '@components/common/AddButton';
import Button from '@components/common/TestButton';
import Row from '@components/layout/RowLayout';
import s from './ListHeader.module.css';
import ProjectAddModal from '@components/common/ProjectAddModal';
import RecordAddModal from '@components/common/RecordAddModal';
import SkillAddModal from '@components/common/SkillAddModal';
import CategoryAddModal from '@components/common/CategoryAddModal';
import { useUI } from '@components/ui/context';
import ChangeChapterOrderModal from '@components/common/ChangeChapterOrderModal';

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
  const [isOpenChapterOrder, setIsOpenChapterOrder] = useState<boolean>(false);
  const router = useRouter();

  const openChapterOrderModal = () => {
    setIsOpenChapterOrder(true);
  };
  const closeChapterOrderModal = () => {
    setIsOpenChapterOrder(false);
  };

  const AddModalUI = (isOpenAddModal: boolean) => {
    switch (router.pathname) {
      case '/records':
        return (
          <>
            <AddButton onClick={() => setIsOpenAddModal(!isOpenAddModal)} />
            {isOpenAddModal && (
              <RecordAddModal isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} setNewRecords={props.setRecords} />
            )}
          </>
        );
      case '/projects':
        return (
          <>
            <AddButton onClick={() => setIsOpenAddModal(!isOpenAddModal)} />
            {isOpenAddModal && (
              <ProjectAddModal
                isOpen={isOpenAddModal}
                setIsOpen={setIsOpenAddModal}
                projects={projects}
                setProjects={setProjects}
              />
            )}
          </>
        );
      case '/skills':
        return (
          <>
            <AddButton onClick={() => setIsOpenAddModal(!isOpenAddModal)} />
            {isOpenAddModal && (
              <SkillAddModal
                isOpen={isOpenAddModal}
                setIsOpen={setIsOpenAddModal}
                newSkills={props.newSkills}
                setNewSkills={props.setNewSkills}
              />
            )}
          </>
        );
      // curriculumとchapterのみモーダルの再レンダリング対策しているためこのような記述にしている
      case '/curriculums':
        return (
          <AddButton
            onClick={() => {
              setModalView('CURRICULUM_ADD_MODAL');
              openModal();
            }}
          />
        );
      case '/curriculums/[slug]':
        return (
          <>
            <Row gap='3rem' justify='end'>
              <Button onClick={openChapterOrderModal}>change order</Button>
              <AddButton
                onClick={() => {
                  setModalView('CHAPTER_ADD_MODAL');
                  openModal();
                }}
              />
            </Row>
            {isOpenChapterOrder && <ChangeChapterOrderModal closeModal={closeChapterOrderModal} />}
          </>
        );
      case '/categories':
        return (
          <>
            <AddButton onClick={() => setIsOpenAddModal(!isOpenAddModal)} />
            {isOpenAddModal && (
              <CategoryAddModal
                isOpen={isOpenAddModal}
                setIsOpen={setIsOpenAddModal}
                setNewCategories={props.setNewCategories}
                newCategories={props.newCategories}
              />
            )}
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
