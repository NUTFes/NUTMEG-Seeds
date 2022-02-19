import { useState } from 'react';
import FlatCard from '@components/common/FlatCard';
import LoginLayout from '@components/layout/LoginLayout';
import SignIn from '@components/common/SignIn'
import SignUp from '@components/common/SignUp'
import TextButton from '@components/common/TextButton'
import type { NextPage } from 'next';

const Home: NextPage = () => {
  let [isMember, setIsMember] = useState(true)
  const cardContent = (isMember: boolean) => {
    if (isMember) {
      return (
        <>
          <TextButton onClick={() => setIsMember(!isMember)}>Log in</TextButton>
          <SignIn/>
        </>
      )
    } else {
      return (
        <>
          <TextButton onClick={() => setIsMember(!isMember)}>Sign up</TextButton>
          <SignUp/>
        </>
      )
    }
  }
  return (
    <LoginLayout>
      <FlatCard>

        { cardContent(isMember) }
      </FlatCard>
    </LoginLayout>
  );
};

export default Home;
