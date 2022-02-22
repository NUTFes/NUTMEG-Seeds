import React, { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import s from './Header.module.css'
import HeaderLogo from '@components/icons/HeaderLogo';

const Header: FC = () => {
  const [headerColor, setHeaderColor] = useState('white');

  const [headerBackgroundColor, setHeaderBackgroundColor] = useState('var(--primary)');

  const [headerShadow, setHeadershadow] = useState('0px');

  const listenScrollEvent = () => {
    if (window.scrollY < 1) {
      return setHeaderBackgroundColor('var(--primary)'), setHeaderColor('white'), setHeadershadow('0px');
    } else {
      return (
        setHeaderBackgroundColor('rgba(255, 255, 255, 0.8)'),
        setHeaderColor('var(--primary)'),
        setHeadershadow('4px 20px rgba(0, 0, 0, 0.25)')
      );
    }
  };
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  });

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
                <Link href='/recordlist'>
                  <a>Record</a>
                </Link>
              </li>
              <li>
                <Link href='/curriculumlist'>
                  <a>Curriculum</a>
                </Link>
              </li>
              <li>
                <Link href='/projectlist'>
                  <a>Project</a>
                </Link>
              </li>
              <li>
                <Link href='/userlist'>
                  <a>Member</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </section>
  );
};

export default Header;
