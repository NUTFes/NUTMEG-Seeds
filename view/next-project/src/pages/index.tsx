import { useState } from 'react';
import FlatCard from '@components/common/FlatCard';
import LoginLayout from '@components/layout/LoginLayout';
import Row from '@components/layout/RowLayout'
import SignIn from '@components/common/SignIn';
import SignUp from '@components/common/SignUp';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  let [isMember, setIsMember] = useState(true);
  const cardContent = (isMember: boolean) => {
    if (isMember) {
      return (
        <>
          <Row gap='2rem'>
            <a onClick={() => setIsMember(!isMember)}><h2>Log in</h2></a>
            <h3>/</h3>
            <a onClick={() => setIsMember(!isMember)}>Sign up</a>
          </Row>
          <SignIn />
        </>
      );
    } else {
      return (
        <>
          <Row gap='2rem'>
            <a onClick={() => setIsMember(!isMember)}><h2>Sign up</h2></a>
            <h3>/</h3>
            <a onClick={() => setIsMember(!isMember)}>Log in</a>
          </Row>
          <SignUp />
        </>
      );
    }
  };
  return (
    <LoginLayout>
      <div>
        <FlatCard gap="gap-s">{cardContent(isMember)}</FlatCard>
      </div>
    </LoginLayout>
  );
};

export default Home;
