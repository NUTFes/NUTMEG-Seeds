import s from './Layout.module.css';
import { useUI } from '@components/ui/context';
import React from 'react';

import AddModal from '@components/common/AddModal';
import EditModal from '@components/common/EditModal';
import DeleteModal from '@components/common/DeleteModal';
import CurriculumAddModal from '@components/common/CurriculumAddModal';

const ModalView: React.FC<{ modalView: string; closeModal(): any }> = ({ modalView, closeModal }) => {
  return (
    <>
      <AddModal onClose={closeModal}>{modalView === 'CURRICULUM_ADD_MODAL' && <CurriculumAddModal />}</AddModal>
      {/* <EditModal onClose={closeModal}>{modalView === 'CURRICULUM_ADD_MODAL' && <CurriculumAddModalView />}</EditModal>
      <DeleteModal onClose={closeModal}>
        {modalView === 'CURRICULUM_ADD_MODAL' && <CurriculumAddModalView />}
      </DeleteModal> */}
    </>
  );
};

const ModalUI: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();
  return displayModal ? <ModalView modalView={modalView} closeModal={closeModal} /> : null;
};

const Layout: React.FC<{ children: any }> = ({ children }) => {
  return (
    <div className={s.root}>
      <main>{children}</main>
      <ModalUI />
    </div>
  );
};

export default Layout;
