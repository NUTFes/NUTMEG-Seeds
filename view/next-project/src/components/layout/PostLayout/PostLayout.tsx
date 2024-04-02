import React, { FC } from 'react';
import Header from '@components/common/Header';
import s from './PostLayout.module.css';

interface LayoutProps {
  children?: React.ReactNode;
}

const PostLayout: FC<LayoutProps> = (props) => {
  return (
    <>
      <Header />
      <section>
        <main className={s.mainLayoutContainer}>{props.children}</main>
      </section>
    </>
  );
};

export default PostLayout;
