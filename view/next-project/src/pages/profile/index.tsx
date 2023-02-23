import { get, put } from '@utils/api_methods';
import { useState, useEffect, useMemo } from 'react';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import s from './index.module.css';
import { useForm } from 'react-hook-form';

interface User {
  id: number;
  name: string;
  email: string;
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

interface Props {
  gradeList: Grade[];
  departmentList: Department[];
  bureauList: Bureau[];
}

export const getServerSideProps = async () => {
  const gradeListUrl = process.env.SSR_API_URI + '/grades';
  const gradeList = await get(gradeListUrl);

  const departmentListUrl = process.env.SSR_API_URI + '/departments';
  const departmentList = await get(departmentListUrl);

  const bureauListUrl = process.env.SSR_API_URI + '/bureaus';
  const bureauList = await get(bureauListUrl);

  return {
    props: {
      gradeList,
      departmentList,
      bureauList,
    },
  };
};

export default function Profile(props: Props) {
  const {
    register,
    handleSubmit,
    setValue
  } = useForm<UserDetail>({
    mode: 'onChange',
  });

  const user_id = useMemo(() => {
    return localStorage.getItem('user_id')?.toString();
  }, []);

  useEffect(() => {
    const fetchUserDetail = async () => {
      const userDetailUrl = process.env.CSR_API_URI + '/user_details/' + user_id;
      const getRes = await get(userDetailUrl);
      setValue('grade_id', getRes.grade_id);
      setValue('department_id', getRes.department_id);
      setValue('bureau_id', getRes.bureau_id);
      setValue('github', getRes.github);
      setValue('biography', getRes.biography);
    };
    fetchUserDetail();
  }, [setValue, user_id]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const onSubmit = async (data: UserDetail) => {
    const putRes = await put(process.env.CSR_API_URI + '/user_details/' + 1, data);
    console.log(putRes);
    if (putRes.status === 200) {
      setSuccess(true);
      setError(false);
    } else {
      setSuccess(false);
      setError(true);
    }
  }

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
            </div>
            <div className={s.setting}>
              <p>Password</p>
              <input type='text' placeholder={password} className={s.input} />
              <button className={s.button}>Update</button>
            </div>
          </div>
          <h2 className={s.sub}>Edit Profile</h2>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={s.setting}>
              <p>学年</p>
              <select className={s.select} {...register('grade_id')}>
                {props.gradeList.map((grade) => (
                  <option key={grade.id} value={grade.id}>
                    {grade.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={s.setting}>
              <p>所属</p>
              <select className={s.select} {...register('department_id')}>
                {props.departmentList.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={s.setting}>
              <p>局</p>
              <select className={s.select} {...register('bureau_id')}>
                {props.bureauList.map((bureau) => (
                  <option key={bureau.id} value={bureau.id}>
                    {bureau.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={s.setting}>
              <p>GitHub</p>
              <input type='text' className={s.input} {...register('github')} />
            </div>
            <div className={s.setting}>
              <p>紹介文</p>
              <textarea className={s.textarea} {...register('biography')} />
            </div>
            <div className={s.submit}>
              <button type='submit' className={s.button}>
                Profile Update
              </button>
            </div>
            <div className={s.status}>
            {success && <p className={s.success}>プロフィールを更新しました</p>}
            {error && <p className={s.error}>プロフィールの更新に失敗しました</p>}
            </div>
          </form>
        </FlatCard>
      </MainLayout>
    </>
  );
}
