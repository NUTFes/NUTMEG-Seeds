import { get, put } from '@utils/api_methods';
import { useForm } from 'react-hook-form';
import { useState, useEffect, useMemo } from 'react';
import s from './ProfileEditForm.module.css';
import { useAuth } from 'src/context/AuthProvider';

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

interface Props {
  gradeList: Grade[];
  departmentList: Department[];
  bureauList: Bureau[];
}

export const ProfileEditForm = (props: Props) => {
  const { currentUser } = useAuth();

  const [userDetail, setUserDetail] = useState<UserDetail>({
    user_id: 0,
    grade_id: 0,
    department_id: 0,
    bureau_id: 0,
    icon_name: '',
    github: '',
    slack: '',
    biography: '',
    pc_name: '',
    pc_os: '',
    pc_cpu: '',
    pc_ram: '',
    pc_storage: '',
  });

  useEffect(() => {
    const userDetailUrl = process.env.CSR_API_URI + '/user_details/' + currentUser?.userId;
    const getUserDetail = async () => {
      const getRes = await get(userDetailUrl);
      setUserDetail(getRes);
    };
    getUserDetail();
  }, [currentUser?.userId]);

  const defaultValues = useMemo(() => {
    return {
      user_id: userDetail.user_id,
      grade_id: userDetail.grade_id,
      department_id: userDetail.department_id,
      bureau_id: userDetail.bureau_id,
      icon_name: userDetail.icon_name,
      github: userDetail.github,
      slack: userDetail.slack,
      biography: userDetail.biography,
      pc_name: userDetail.pc_name,
      pc_os: userDetail.pc_os,
      pc_cpu: userDetail.pc_cpu,
      pc_ram: userDetail.pc_ram,
      pc_storage: userDetail.pc_storage,
    };
  }, [userDetail]);

  const { register, handleSubmit, reset, watch } = useForm<UserDetail>({
    mode: 'onChange',
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const onSubmit = async (data: UserDetail) => {
    const putRes = await put(process.env.CSR_API_URI + '/user_details/' + currentUser?.userId, data);
    if (putRes.status === 200) {
      setSuccess(true);
      setError(false);
    } else {
      setSuccess(false);
      setError(true);
    }
  };

  const watchAll =
    watch('grade_id') + watch('department_id') + watch('bureau_id') + watch('github') + watch('biography');

  const messageResetHandler = () => {
    setSuccess(false);
    setError(false);
  };

  useEffect(() => {
    messageResetHandler();
  }, [watchAll]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.profile}>
        <p>学年</p>
        <select className={s.select} {...register('grade_id')}>
          {props.gradeList?.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {grade.name}
            </option>
          ))}
        </select>
      </div>
      <div className={s.profile}>
        <p>所属</p>
        <select className={s.select} {...register('department_id')}>
          {props.departmentList?.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
      </div>
      <div className={s.profile}>
        <p>局</p>
        <select className={s.select} {...register('bureau_id')}>
          {props.bureauList?.map((bureau) => (
            <option key={bureau.id} value={bureau.id}>
              {bureau.name}
            </option>
          ))}
        </select>
      </div>
      <div className={s.profile}>
        <p>GitHub</p>
        <input type='text' className={s.input} {...register('github')} />
      </div>
      <div className={s.profile}>
        <p>紹介文</p>
        <textarea className={s.textarea} {...register('biography')} />
      </div>
      <div className={s.submit}>
        <button type='submit' className={s.button}>
          Update Profile
        </button>
      </div>
      <div className={s.status}>
        {success && <p className={s.success}>プロフィールを更新しました</p>}
        {error && <p className={s.error}>プロフィールの更新に失敗しました</p>}
      </div>
    </form>
  );
};

export default ProfileEditForm;
