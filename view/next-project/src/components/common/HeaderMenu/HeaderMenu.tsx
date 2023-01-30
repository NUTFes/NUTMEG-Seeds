import React, { FC, useState } from 'react';
import router from 'next/router';
import s from './HeaderMenu.module.css';

const HeaderMenu: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    router.push('/');
  };

  return (
    <div className={s.container}>
      <button className={s.button} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        Menu
      </button>
      <div
        className={s.menu}
        style={{
          transition: '0.1s',
          opacity: isMenuOpen ? 1 : 0,
        }}
      >
        <div
          className={s.menuItem}
          onClick={() => {
            router.push('/profile');
          }}
        >
          Profile
        </div>
        <div className={s.menuItem} onClick={logout}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
