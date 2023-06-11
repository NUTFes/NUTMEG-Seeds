import React from 'react';
import Router from 'next/router';
import LeftArrow from '@components/icons/LeftArrow';
import s from './BackButton.module.css';

const BackButton = () => {
  return (
    <div className={s.ButtonContainer}>
      <div>
        <button onClick={() => Router.back()}>
          <LeftArrow width={30} height={30} color={'var(--accent-0)'} />
        </button>
      </div>
    </div>
  );
};

export default BackButton;
