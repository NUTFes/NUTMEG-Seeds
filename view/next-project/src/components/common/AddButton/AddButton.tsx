import React from 'react';
import s from './AddButton.module.css'
import Add from '@components/icons/Add';

interface ButtonContentsProps {
  width?: string;
  height?: string;
  text?: string;
  onClick?: (event: any) => void;
  children?: React.ReactNode;
}

function AddButton(props: ButtonContentsProps): JSX.Element {

  return (
    <>
      <button className={s.buttonContainer} onClick={props.onClick}>
        {props.children}
        {props.text}
        <Add height={24} width={24} color='var(--accent-0)' />
      </button>
    </>
  );
}

export default AddButton;
