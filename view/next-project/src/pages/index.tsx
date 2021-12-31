import LoginLayout from '@components/layout/LoginLayout';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { get } from '../utils/api_methods';

const Home: NextPage = () => {
  return (
    <LoginLayout>
      <div></div>
    </LoginLayout>
  );
};

export default Home;
