import s from './Layout.module.css';
import { useUI } from '@components/ui/context';
import React from 'react';

import AddModal from '@components/common/AddModal';
import EditModal from '@components/common/EditModal';
import DeleteModal from '@components/common/DeleteModal';
import CurriculumAddModal from '@components/common/CurriculumAddModal';
import CurriculumEditModal from '@components/common/CurriculumEditModal';
import CurriculumDeleteModal from '@components/common/CurriculumDeleteModal';

const ModalView: React.FC<{ modalView: string; closeModal(): any }> = ({ modalView, closeModal }) => {
  return (
    <>
      {modalView === 'CURRICULUM_ADD_MODAL' && (
        <AddModal onClose={closeModal}>
          <CurriculumAddModal />
        </AddModal>
      )}
      {modalView === 'CURRICULUM_EDIT_MODAL' && (
        <EditModal onClose={closeModal}>
          <CurriculumEditModal />
        </EditModal>
      )}
      {modalView === 'CURRICULUM_DELETE_MODAL' && (
        <DeleteModal onClose={closeModal}>
          <CurriculumDeleteModal />
        </DeleteModal>
      )}
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
