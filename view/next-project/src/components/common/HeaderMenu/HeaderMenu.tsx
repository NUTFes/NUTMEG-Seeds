import React, { FC, useState } from 'react';
import router from 'next/router';
import s from './HeaderMenu.module.css';
import { useRecoilState } from 'recoil';
import { userState } from 'src/store/user';

const HeaderMenu: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  const logout = () => {
    setUser({
      userId: '',
      accessToken: '',
      client: '',
      uid: '',
      tokenType: '',
    });
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
