import { get } from '@utils/api_methods';
import { formatDate } from '@utils/format_date';
import { useState, useMemo, useEffect } from 'react';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import s from './index.module.css';

interface Props {
  user: User[];
  detail: UserDetail[];
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserDetail {
  grade: number;
  department: number;
  bureau: number;
  icon_name: string;
  github: string;
  slack: string;
  biography: string;
  pc_name: string;
  pc_os: string;
  pc_cpu: string;
  pc_ram: string;
  pc_storage: string;
}

export async function getServerSideProps({ params }: any) {
  console.log(params);
  const getUserUrl = process.env.SSR_API_URI + '/api/v1/users';
  const getUserRes = await get(getUserUrl);
  const getDetailUrl = process.env.SSR_API_URI + '/api/v1/user_details';
  const getDetailRes = await get(getDetailUrl);
  return {
    props: {
      user: getUserRes,
      detail: getDetailRes
    },
  };
}

export default function Profile(props: Props) {
  const user = props.user;
  const detail = props.detail;

  useEffect(() => {
    console.log(props);
  }, [props]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <MainLayout>
        <h1 className={s.title}>Profile</h1>
        <FlatCard>
          <div>
            <h2 className={s.sub}>Edit Settings</h2>
            <hr />
            <div className={s.setting}>
              <p>Email</p>
              <input type='text' placeholder={email} className={s.input} />
              <button className={s.button}>Update</button>
              <p>Password</p>
              <input type='text' placeholder={password} className={s.input} />
              <button className={s.button}>Update</button>
            </div>
            <h2 className={s.sub}>Edit Profile</h2>
            <hr />
          </div>
        </FlatCard>
      </MainLayout>
    </>
  );
}
