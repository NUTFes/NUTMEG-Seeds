import React, { FC, useEffect } from 'react';
import Link from 'next/link';
import s from './Header.module.css';
import HeaderMenu from '@components/common/HeaderMenu';
import HeaderLogo from '@components/icons/HeaderLogo';

const Header: FC = () => {
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
                <Link href='/records'legacyBehavior>
                  <a>Record</a>
                </Link>
              </li>
              <li>
                <Link href='/curriculums' legacyBehavior>
                  <a>Curriculum</a>
                </Link>
              </li>
              <li>
                <Link href='/projects' legacyBehavior>
                  <a>Project</a>
                </Link>
              </li>
              <li>
                <Link href='/users' legacyBehavior>
                  <a>Member</a>
                </Link>
              </li>
              <li>
                <Link href='/skills' legacyBehavior>
                  <a>Skills</a>
                </Link>
              </li>
              <li>
                <Link href='/categories' legacyBehavior>
                  <a>Categories</a>
                </Link>
              </li>
            </ul>
          </nav>
          <HeaderMenu />
        </div>
      </header>
    </section>
  );
};

export default Header;
