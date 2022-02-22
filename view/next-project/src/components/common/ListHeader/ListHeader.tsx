import React, { useState } from 'react';
import ListPageTitle from '@components/common/ListPageTitle';
import Button from '@components/common/AddButton';
import s from './ListHeader.module.css';
import CurriculumAddModal from '@components/common/CurriculumAddModal';

interface Skills {
  id: number;
  name: string;
  detail: string;
  category_id: number;
};

interface Props {
  title: string;
  children?: React.ReactNode;
  skills: Skills[];
}

const ListHeader = (props: Props) => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const AddModal = (isOpenAddModal: boolean) => {
    if (isOpenAddModal) {
      return (
        <>
          <CurriculumAddModal isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} skills={props.skills} />
        </>
      );
    }
  };
  return (
    <div className={s.HeaderContainer}>
      <div className={s.SplitLeftContainer}>
        <ListPageTitle title={props.title} />
      </div>
      <div className={s.SplitRightContainer}>
        <Button onClick={() => setIsOpenAddModal(!isOpenAddModal)}></Button>
        {AddModal(isOpenAddModal)}
      </div>
    </div>
  );
};

export default ListHeader;
