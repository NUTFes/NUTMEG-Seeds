import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@components/common/AddButton';
import s from './ListHeader.module.css';
import CurriculumAddModal from '@components/common/CurriculumAddModal';
import ProjectAddModal from '@components/common/ProjectAddModal';
import RecordAddModal from '@components/common/RecordAddModal';
import SkillAddModal from '@components/common/SkillAddModal'
import { get } from '@utils/api_methods';

interface Skill {
  id: string;
  name: string;
}

type NewSkill = {
  id: number;
  name: string;
  category_id: number;
  category_name: string;
  created_at: string;
}

interface Props {
  title: string;
  children?: React.ReactNode;
  setRecords?: any;
  setCurriculums?: any;
  setNewSkills?: any;
  newSkills?: NewSkill[];
}

const ListHeader = (props: Props) => {
  const [skills, setSkills] = useState<Skill[]>([{ id: '', name: '' }]);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getSkillsUrl = process.env.CSR_API_URI + '/skills';
    const getSkills = async (url: string) => {
      setSkills(await get(url));
    };
    getSkills(getSkillsUrl);
  }, []);

  const AddModal = (isOpenAddModal: boolean) => {
    if (isOpenAddModal) {
      switch (router.pathname) {
        case '/records':
          return (
            <>
              <RecordAddModal isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} setNewRecords={props.setRecords} />
            </>
          );
        case '/curriculums':
          return (
            <>
              <CurriculumAddModal isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} skills={skills} setNewCurriculums={props.setCurriculums} />
            </>
          );
        case '/projects':
          return (
            <>
              <ProjectAddModal isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
            </>
          );
        case '/skills':
          return (
            <>
              <SkillAddModal isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} newSkills={props.newSkills} setNewSkills={props.setNewSkills} />
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
        <Button onClick={() => setIsOpenAddModal(!isOpenAddModal)}></Button>
        {AddModal(isOpenAddModal)}
      </div>
    </div>
  );
};

export default ListHeader;
