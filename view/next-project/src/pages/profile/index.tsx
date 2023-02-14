import { get } from '@utils/api_methods';
import { formatDate } from '@utils/format_date';
import { useState, useMemo, useEffect } from 'react';
import MainLayout from '@components/layout/MainLayout';
import FlatCard from '@components/common/FlatCard';
import s from './index.module.css';

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
}

export default function Profile(props: Props) {
  const [userDetail, setUserDetail] = useState<UserDetail>();

  useEffect(() => {
    const fetchUserDetail = async () => {
      const userDetailUrl = process.env.CSR_API_URI + '/user_details/' + 1;
      setUserDetail(await get(userDetailUrl));
    };
    fetchUserDetail();
  }, []);

  useEffect(() => {
    console.log(userDetail);
  }, [userDetail]);

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
            </div>
            <div className={s.setting}>
              <p>Password</p>
              <input type='text' placeholder={password} className={s.input} />
              <button className={s.button}>Update</button>
            </div>
          </div>
          <div>
            <h2 className={s.sub}>Edit Profile</h2>
            <hr />
            <div className={s.setting}>
              <p>学年</p>
              <select className={s.select}>
                {props.gradeList.map((grade) => (
                  <option key={grade.id} value={grade.id}>
                    {grade.name}
                  </option>
                ))}
              </select>
              <button className={s.button}>Update</button>
            </div>
            <div className={s.setting}>
              <p>所属</p>
              <select className={s.select}>
                {props.departmentList.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
              <button className={s.button}>Update</button>
            </div>
            <div className={s.setting}>
              <p>局</p>
              <select className={s.select}>
                {props.bureauList.map((bureau) => (
                  <option key={bureau.id} value={bureau.id}>
                    {bureau.name}
                  </option>
                ))}
              </select>
              <button className={s.button}>Update</button>
            </div>
            <div className={s.setting}>
              <p>GitHub</p>
              <input type='text' placeholder={userDetail?.github} className={s.input} />
              <button className={s.button}>Update</button>
            </div>
            <div className={s.setting}>
              <p>紹介文</p>
              <textarea placeholder={userDetail?.biography} className={s.textarea} />
              <button className={s.button}>Update</button>
            </div>
          </div>
        </FlatCard>
      </MainLayout>
    </>
  );
}
