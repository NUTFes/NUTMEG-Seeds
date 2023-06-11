import React, { FC } from 'react';
import Close from '@components/icons/Close';
import s from './EditModal.module.css';

interface ModalProps {
  show?: boolean;
  setShow?: any;
  onClose?: () => void;
  children?: React.ReactNode;
}

const EditModal: FC<ModalProps> = (props) => {
  return (
    <div className={s.modalContainer}>
      <div className={s.modalInnerContainer}>
        <div className={s.modalContent}>
          <div>
            <button
              className={s.modalContentClose}
              onClick={() => {
                if (props.setShow) {
                  props.setShow(false);
                }
                if (props.onClose) {
                  props.onClose();
                }
              }}
            >
              <Close width={24} height={24} color={'var(--accent-4)'} />
            </button>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default EditModal;
