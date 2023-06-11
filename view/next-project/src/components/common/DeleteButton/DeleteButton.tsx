import React from 'react';
import s from './DeleteButton.module.css';
import Delete from '@components/icons/Delete';

interface ButtonContentsProps {
  width?: string;
  height?: string;
  text?: string;
  onClick?: (event: any) => void;
  children?: React.ReactNode;
}

function DeleteButton(props: ButtonContentsProps): JSX.Element {
  return (
    <>
      <button className={s.buttonContainer} onClick={props.onClick}>
        <Delete height={24} width={24} color='var(--accent-0)' />
      </button>
    </>
  );
}

export default DeleteButton;
