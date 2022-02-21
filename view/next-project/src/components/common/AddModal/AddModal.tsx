import React, { FC } from 'react';
import Close from '@components/icons/Close';
import s from './AddModal.module.css';

interface ModalProps {
  show: boolean;
  setShow: any;
  children?: React.ReactNode;
}

const AddModal: FC<ModalProps> = (props) => {
  return (
    <div className={s.modalContainer}>
      <div className={s.modalInnerContainer}>
        <div className={s.modalContent}>
          <div>
            <button className={s.modalContentClose} onClick={() => props.setShow(false)}>
              <Close width={24} height={24} color={'var(--accent-4)'} />
            </button>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default AddModal;
