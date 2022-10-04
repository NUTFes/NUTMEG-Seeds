import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@components/common/AddButton';
import s from './ListHeader.module.css';
import ProjectAddModal from '@components/common/ProjectAddModal';
import RecordAddModal from '@components/common/RecordAddModal';
import SkillAddModal from '@components/common/SkillAddModal';
import { useUI } from '@components/ui/context';

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

interface Props {
  title: string;
  setRecords?: any;
  newSkills?: NewSkill[];
  setNewSkills?: any;
}

const ListHeader = (props: Props) => {
  const { setModalView, openModal } = useUI();

  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: '', detail: '', icon_name: '', github: '', remark: '' },
  ]);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const router = useRouter();

  const AddModal = (isOpenAddModal: boolean) => {
    if (isOpenAddModal && router.pathname !== '/curriculums') {
      switch (router.pathname) {
        case '/records':
          return (
            <>
              <RecordAddModal isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} setNewRecords={props.setRecords} />
            </>
          );
        case '/projects':
          return (
            <>
              <ProjectAddModal
                isOpen={isOpenAddModal}
                setIsOpen={setIsOpenAddModal}
                projects={projects}
                setProjects={setProjects}
              />
            </>
          );
        case '/skills':
          return (
            <>
              <SkillAddModal
                isOpen={isOpenAddModal}
                setIsOpen={setIsOpenAddModal}
                newSkills={props.newSkills}
                setNewSkills={props.setNewSkills}
              />
            </>
          );
      }
    }
  };
  return (
    <div className={s.HeaderContainer}>
      <div className={s.SplitLeftContainer}>
        <h1>{props.title}</h1>
      </div>
      <div className={s.SplitRightContainer}>
        {/* curriculumsのみモーダルの再レンダリング対策しているためこのような記述にしている */}
        {router.pathname === '/curriculums' ? (
          <Button
            onClick={() => {
              setModalView('CURRICULUM_ADD_MODAL');
              openModal();
            }}
          ></Button>
        ) : (
          <Button onClick={() => setIsOpenAddModal(!isOpenAddModal)}></Button>
        )}
        {AddModal(isOpenAddModal)}
      </div>
    </div>
  );
};

export default ListHeader;
