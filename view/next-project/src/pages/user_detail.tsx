import { useState } from 'react';
import FlatCard from '@components/common/FlatCard';
import LoginLayout from '@components/layout/LoginLayout';
import Row from '@components/layout/RowLayout';
import Regist from '@components/common/RegistUserDetail'
import type { NextPage } from 'next';

const RegistUserDetail: NextPage = () => {
  return (
    <LoginLayout>
      <div>
        <FlatCard gap='gap-s'><Regist /></FlatCard>
      </div>
    </LoginLayout>
  );
};

export default RegistUserDetail;
