import { get, put } from '@utils/api_methods';
import { useForm } from 'react-hook-form';
import { useState, useEffect, useMemo } from 'react';
import s from './ProfileEditForm.module.css';
import { useAuth } from 'src/context/AuthProvider';
import { snakeToCamel, camelToSnake } from '@utils/namingConversion';

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

interface Type {
  id: number;
  name: string;
}

export interface UserDetail {
  userId: number;
  gradeId: number;
  departmentId: number;
  bureauId: number;
  typeId: number;
  iconName: string;
  github: string;
  slack: string;
  biography: string;
  pcName: string;
  pcOs: string;
  pcCpu: string;
  pcRam: string;
  pcStorage: string;
}

interface Props {
  gradeList: Grade[];
  departmentList: Department[];
  bureauList: Bureau[];
  typeList: Type[];
}

export const ProfileEditForm = (props: Props) => {
  const { currentUser } = useAuth();

  const [userDetail, setUserDetail] = useState<UserDetail>({
    userId: 0,
    gradeId: 0,
    departmentId: 0,
    bureauId: 0,
    typeId: 0,
    iconName: '',
    github: '',
    slack: '',
    biography: '',
    pcName: '',
    pcOs: '',
    pcCpu: '',
    pcRam: '',
    pcStorage: '',
  });

  useEffect(() => {
    const userDetailUrl = process.env.CSR_API_URI + '/user_details/' + currentUser?.userId;
    const getUserDetail = async () => {
      await get(userDetailUrl).then((res) => {
        const camelUserDetail = snakeToCamel(res);
        setUserDetail(camelUserDetail as UserDetail);
      });
    };
    getUserDetail();
  }, [currentUser?.userId]);

  const defaultValues = useMemo(() => {
    return {
      userId: userDetail.userId,
      gradeId: userDetail.gradeId,
      departmentId: userDetail.departmentId,
      bureauId: userDetail.bureauId,
      typeId: userDetail.typeId,
      iconName: userDetail.iconName,
      github: userDetail.github,
      slack: userDetail.slack,
      biography: userDetail.biography,
      pcName: userDetail.pcName,
      pcOs: userDetail.pcOs,
      pcCpu: userDetail.pcCpu,
      pcRam: userDetail.pcRam,
      pcStorage: userDetail.pcStorage,
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
    const submitData = camelToSnake(data);
    const putRes = await put(process.env.CSR_API_URI + '/user_details/' + currentUser?.userId, submitData);
    if (putRes.status === 200) {
      setSuccess(true);
      setError(false);
    } else {
      setSuccess(false);
      setError(true);
    }
  };

  const watchAll =
    watch('gradeId') +
    watch('departmentId') +
    watch('bureauId') +
    watch('typeId') +
    watch('iconName') +
    watch('github') +
    watch('biography') +
    watch('pcName') +
    watch('pcOs') +
    watch('pcCpu') +
    watch('pcRam') +
    watch('pcStorage');

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
        <select className={s.select} {...register('gradeId')}>
          {props.gradeList?.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {grade.name}
            </option>
          ))}
        </select>
      </div>
      <div className={s.profile}>
        <p>所属</p>
        <select className={s.select} {...register('departmentId')}>
          {props.departmentList?.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
      </div>
      <div className={s.profile}>
        <p>局</p>
        <select className={s.select} {...register('bureauId')}>
          {props.bureauList?.map((bureau) => (
            <option key={bureau.id} value={bureau.id}>
              {bureau.name}
            </option>
          ))}
        </select>
      </div>
      <div className={s.profile}>
        <p>アイコン</p>
        <input type='text' className={s.input} {...register('iconName')} placeholder='***.png / ***.jpg' />
      </div>
      <div className={s.profile}>
        <p>GitHub</p>
        <input type='text' className={s.input} {...register('github')} placeholder='https://github.com/***' />
      </div>
      <div className={s.profile}>
        <p>紹介文</p>
        <textarea className={s.textarea} {...register('biography')} />
      </div>
      <div className={s.profile}>
        <p>PC名</p>
        <input type='text' className={s.input} {...register('pcName')} />
      </div>
      <div className={s.profile}>
        <p>PC OS</p>
        <input type='text' className={s.input} {...register('pcOs')} />
      </div>
      <div className={s.profile}>
        <p>PC CPU</p>
        <input type='text' className={s.input} {...register('pcCpu')} />
      </div>
      <div className={s.profile}>
        <p>PC RAM</p>
        <input type='text' className={s.input} {...register('pcRam')} />
      </div>
      <div className={s.profile}>
        <p>PC Strage</p>
        <input type='text' className={s.input} {...register('pcStorage')} />
      </div>
      <div className={s.profile}>
        <p>得意分野</p>
        <select className={s.select} {...register('typeId')}>
          {props.typeList?.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
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
