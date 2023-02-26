import { get, put } from '@utils/api_methods';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import s from './index.module.css';
import { useRouter } from 'next/router';
import ProfileEditForm from '@components/common/ProfileEditForm';
import SettingEditForm from '@components/common/SettingEditForm';
import PasswordResetForm from '@components/common/PasswordResetForm';

interface Grade {
  id: number;
  name: string;
}

interface Department {
  id: number;
  name: string;
}

interface Bureau {
  id: number;
  name: string;
}
interface User {
  id: number;
  provider: string;
  uid: string;
  allow_password_change: boolean;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  gradeList: Grade[];
  departmentList: Department[];
  bureauList: Bureau[];
  users: User[];
}

interface UserDetail {
  user_id: number;
  grade_id: number;
  department_id: number;
  bureau_id: number;
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

export const getServerSideProps = async () => {
  const gradeListUrl = process.env.SSR_API_URI + '/grades';
  const gradeList = await get(gradeListUrl);

  const departmentListUrl = process.env.SSR_API_URI + '/departments';
  const departmentList = await get(departmentListUrl);

  const bureauListUrl = process.env.SSR_API_URI + '/bureaus';
  const bureauList = await get(bureauListUrl);

  const usersUrl = process.env.SSR_API_URI + '/api/v1/users';
  const users = await get(usersUrl);

  return {
    props: {
      gradeList,
      departmentList,
      bureauList,
      users,
    },
  };
};

export default function Profile(props: Props) {
  const { users, gradeList, departmentList, bureauList } = props;

  const router = useRouter();

  return (
    <>
      <MainLayout>
        <h1 className={s.title}>Profile</h1>
        <FlatCard>
          <h2 className={s.sub}>Edit Settings</h2>
          <hr />
          <SettingEditForm users={users} />
          <h2 className={s.sub}>Edit Password</h2>
          <hr className={s.underline} />
          <PasswordResetForm />
          <h2 className={s.sub}>Edit Profile</h2>
          <hr />
          <ProfileEditForm gradeList={gradeList} departmentList={departmentList} bureauList={bureauList} />
        </FlatCard>
      </MainLayout>
    </>
  );
}
