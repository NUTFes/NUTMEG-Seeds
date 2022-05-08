import React, { FC, useEffect } from 'react';
import Link from 'next/link';
import s from './Header.module.css';
import IconButton from '@components/common/IconButton';
import HeaderLogo from '@components/icons/HeaderLogo';
import Logout from '@components/icons/Logout'
import router from 'next/router';

const Header: FC = () => {
  const logout = () => {
    localStorage.clear()
    router.push('/')
  }

  return (
    <section className={s.headerContainer}>
      <header>
        <div>
          <HeaderLogo height={30} width={142} color={'var(--accent-0)'} />
        </div>
        <div className={s.headerLinks}>
          <nav>
            <ul>
              <li>
                <Link href='/records'>
                  <a>Record</a>
                </Link>
              </li>
              <li>
                <Link href='/curriculums'>
                  <a>Curriculum</a>
                </Link>
              </li>
              <li>
                <Link href='/projects'>
                  <a>Project</a>
                </Link>
              </li>
              <li>
                <Link href='/users'>
                  <a>Member</a>
                </Link>
              </li>
              <li>
                <Link href='/skills'>
                  <a>Skills</a>
                </Link>
              </li>
            </ul>
          </nav>
          <IconButton onClick={logout}><Logout width={20} height={20} color={'var(--accent-0)'}/></IconButton>
        </div>
      </header>
    </section>
  );
};

export default Header;
