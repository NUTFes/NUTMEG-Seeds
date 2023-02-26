import { put } from '@utils/api_methods';
import { useForm } from 'react-hook-form';
import { useState, useEffect, useMemo } from 'react';
import s from './SettingEditForm.module.css';
import { useAuth } from 'src/context/AuthProvider';

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
  users: User[];
}

export const SettingEditForm = (props: Props) => {
  const { users } = props;
  const { currentUser } = useAuth();
  const [user, setUser] = useState<User>({
    id: 0,
    provider: '',
    uid: '',
    allow_password_change: false,
    name: '',
    email: '',
    created_at: '',
    updated_at: '',
  });

  useEffect(() => {
    const user = users.find((user) => user.id === Number(currentUser?.userId));
    if (user) {
      setUser(user);
    }
  }, [currentUser, users]);

  const defaultValues = useMemo(() => {
    return {
      id: user.id,
      provider: user.provider,
      uid: user.uid,
      allow_password_change: user.allow_password_change,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }, [user]);

  const { register, handleSubmit, setValue, watch, reset } = useForm<User>({
    mode: 'onChange',
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const watchEmail = watch('email');
  const watchName = watch('name');
  useEffect(() => {
    setValue('uid', watchEmail);
  }, [watchEmail, setValue]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const onSubmit = async (data: User) => {
    const putUrl = process.env.CSR_API_URI + '/api/auth?access-token=' + currentUser?.accessToken + '&client=' + currentUser?.client + '&uid=' + currentUser?.uid;
    const putRes = await put(putUrl, data);
    console.log(await putRes.json())
    if (putRes.status === 200) {
      setSuccess(true);
      setError(false);
    } else {
      setSuccess(false);
      setError(true);
    }
  };

  const messageResetHandler = () => {
    setSuccess(false);
    setError(false);
  };

  useEffect(() => {
    messageResetHandler();
  }, [watchEmail, watchName]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.profile}>
        <p>名前</p>
        <input type='text' className={s.input} {...register('name')} />
      </div>
      <div className={s.profile}>
        <p>メール</p>
        <input type='text' className={s.input} {...register('email')} />
      </div>
      <div className={s.submit}>
        <button type='submit' className={s.button}>
          Profile Settings
        </button>
      </div>
      <div className={s.status}>
        {success && <p className={s.success}>プロフィールを更新しました</p>}
        {error && <p className={s.error}>プロフィールの更新に失敗しました</p>}
      </div>
    </form>
  );
};

export default SettingEditForm;
