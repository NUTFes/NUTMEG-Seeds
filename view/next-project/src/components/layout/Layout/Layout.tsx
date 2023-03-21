import s from './Layout.module.css';
import { useUI } from '@components/ui/context';
import React from 'react';

import EditModal from '@components/common/EditModal';
import DeleteModal from '@components/common/DeleteModal';
import CurriculumAddModal from '@components/common/CurriculumAddModal';
import CurriculumEditModal from '@components/common/CurriculumEditModal';
import CurriculumDeleteModal from '@components/common/CurriculumDeleteModal';
import ChapterAddModal from '@components/common/ChapterAddModal';
import ChapterDeleteModal from '@components/common/ChapterDeleteModal';

const ModalView: React.FC<{ modalView: string; closeModal(): any }> = ({ modalView, closeModal }) => {
  return (
    <>
      {modalView === 'CURRICULUM_ADD_MODAL' && <CurriculumAddModal />}
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
      {modalView === 'CHAPTER_ADD_MODAL' && <ChapterAddModal />}
      {modalView === 'CHAPTER_DELETE_MODAL' && (
        <DeleteModal onClose={closeModal}>
          <ChapterDeleteModal />
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
