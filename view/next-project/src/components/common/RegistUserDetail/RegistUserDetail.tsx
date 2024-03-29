import React, { FC, useState, useEffect } from 'react';
import Router from 'next/router';
import { get, post } from '@utils/api_methods';
import SubmitButton from '@components/common/TestButton';
import s from './RegistUserDetail.module.css';
import { useAuth } from 'src/context/AuthProvider';

interface submitData {
  user_id: string | any;
  grade_id: string;
  department_id: string;
  bureau_id: string;
  icon_name: string;
  github: string;
  slack: string;
  biography: string;
  pc_name: string;
  pc_os: string;
  pc_cpu: string;
  pc_ram: string;
  pc_storage: string;
  type_id: number;
}

interface Grade {
  id: string;
  name: string;
}

interface Department {
  id: string;
  name: string;
}

interface Bureau {
  id: string;
  name: string;
}

interface Type {
  id: string;
  name: string;
}

export const submitUser = async (data: submitData, setErrorMessage: Function) => {
  const submitUrl = process.env.CSR_API_URI + '/user_details';
  const res: any = await post(submitUrl, data);
  if (res.status === 201) {
    Router.push('/records');
  } else {
    setErrorMessage('登録に失敗しました');
  }
};

const RegistUserDetail: FC = () => {
  const [formData, setFormData] = useState<submitData>({
    user_id: '',
    grade_id: '',
    department_id: '',
    bureau_id: '',
    icon_name: '',
    github: '',
    slack: '',
    biography: '',
    pc_name: '',
    pc_os: '',
    pc_cpu: '',
    pc_ram: '',
    pc_storage: '',
    type_id: 1,
  });
  const [gradeList, setGradeList] = useState<Grade[]>([]);
  const [departmentList, setDepartmentList] = useState<Department[]>([]);
  const [bureauList, setBureauList] = useState<Bureau[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [typeList, setTypeList] = useState<Type[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const getGradeListUrl = process.env.CSR_API_URI + '/grades';
    const getGradeList = async (url: string) => {
      setGradeList(await get(url));
    };
    getGradeList(getGradeListUrl);

    const getDepartmentListUrl = process.env.CSR_API_URI + '/departments';
    const getDepartmentList = async (url: string) => {
      setDepartmentList(await get(url));
    };
    getDepartmentList(getDepartmentListUrl);

    const getBureauListUrl = process.env.CSR_API_URI + '/bureaus';
    const getBureauList = async (url: string) => {
      setBureauList(await get(url));
    };
    getBureauList(getBureauListUrl);

    const getTypeListUrl = process.env.CSR_API_URI + '/types';
    const getTypeList = async (url: string) => {
      setTypeList(await get(url));
    };
    getTypeList(getTypeListUrl);

    setFormData({ ...formData, ['user_id']: currentUser?.userId });
  }, []);

  const handler =
    (input: string) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
    ) => {
      setFormData({ ...formData, [input]: e.target.value });
    };

  return (
    <>
      <div className={s.formContainer}>
        <h2>Detail</h2>
        <div>
          <h3>Grade</h3>
          <select defaultValue={formData.grade_id} onChange={handler('grade_id')}>
            <option value=''>select</option>
            {gradeList.map((grade: Grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h3>Department</h3>
          <select defaultValue={formData.department_id} onChange={handler('department_id')}>
            <option value=''>select</option>
            {departmentList.map((department: Department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h3>Bureau</h3>
          <select defaultValue={formData.bureau_id} onChange={handler('bureau_id')}>
            <option value=''>select</option>
            {bureauList.map((bureau: Bureau) => (
              <option key={bureau.id} value={bureau.id}>
                {bureau.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h3>Type</h3>
          <select defaultValue={formData.type_id} onChange={handler('type_id')}>
            <option value=''>select</option>
            {typeList.map((type: Type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h3>GitHub</h3>
          <input placeholder='Input' value={formData.github} onChange={handler('github')} />
        </div>
        <div>
          <h3>Slack</h3>
          <input type='text' placeholder='Input' value={formData.slack} onChange={handler('slack')} />
        </div>
        <div>
          <h3>Biography</h3>
          <textarea placeholder='Input' value={formData.biography} onChange={handler('biography')} />
        </div>
        <SubmitButton onClick={() => submitUser(formData, setErrorMessage)}>Login</SubmitButton>
        {errorMessage && <p className={s.error}>{errorMessage}</p>}
      </div>
    </>
  );
};

export default RegistUserDetail;
