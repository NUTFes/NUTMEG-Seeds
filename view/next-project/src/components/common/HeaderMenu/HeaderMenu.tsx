import React, { FC, useState } from 'react';
import router from 'next/router';
import s from './HeaderMenu.module.css';
import { useRecoilState } from 'recoil';
import { userState } from '@store/user';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoLogOutSharp } from 'react-icons/io5';

const HeaderMenu: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  const logout = () => {
    setUser(undefined);
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
          visibility: isMenuOpen ? 'visible' : 'hidden',
        }}
      >
        <button
          className={s.menuItem}
          onClick={() => {
            router.push('/profile');
          }}
        >
          <BsFillPersonFill />
          Profile
        </button>
        <button className={s.menuItem} onClick={logout}>
          <IoLogOutSharp />
          Logout
        </button>
      </div>
    </div>
  );
};

export default HeaderMenu;
