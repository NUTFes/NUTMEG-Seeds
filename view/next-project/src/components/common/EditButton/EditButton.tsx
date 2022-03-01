import React from 'react';
import s from './EditButton.module.css'
import Edit from '@components/icons/Edit';

interface ButtonContentsProps {
  width?: string;
  height?: string;
  text?: string;
  onClick?: (event: any) => void;
  children?: React.ReactNode;
}

function EditButton(props: ButtonContentsProps): JSX.Element {

  return (
    <>
      <button className={s.buttonContainer} onClick={props.onClick}>
        <Edit height={24} width={24} color='var(--accent-0)' />
      </button>
    </>
  );
}

export default EditButton;
