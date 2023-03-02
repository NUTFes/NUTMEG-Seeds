import { putWithToken } from '@utils/api_methods';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import s from './PasswordResetForm.module.css';
import { useAuth } from 'src/context/AuthProvider';
import React from 'react';

interface FormData {
  password: string;
  passwordConfirmation: string;
}

export const PasswordResetForm: React.FC = () => {
  const { currentUser } = useAuth();

  const { register, handleSubmit, watch } = useForm<FormData>({
    mode: 'onChange',
  });

  const watchPassword = watch('password');
  const watchPasswordConfirmation = watch('passwordConfirmation');

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const onSubmit = async (data: FormData) => {
    if (data.password !== data.passwordConfirmation) {
      setSuccess(false);
      setErrorMessage('パスワードが一致しません');
      return;
    }

    if (data.password.length === 0 || data.passwordConfirmation.length === 0) {
      setSuccess(false);
      setErrorMessage('パスワードを入力してください');
      return;
    }

    const putUrl = process.env.CSR_API_URI + '/auth';
    const submitData = {
      password: data.password,
    };
    const putRes = await putWithToken(putUrl, submitData, currentUser);
    if (putRes.status === 200) {
      setSuccess(true);
      setErrorMessage('');
    } else {
      setSuccess(false);
      setErrorMessage('パスワードの更新に失敗しました');
    }
  };

  useEffect(() => {
    setSuccess(false);
    setErrorMessage('');
  }, [watchPassword, watchPasswordConfirmation]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.profile}>
        <p>パスワード</p>
        <input type='password' className={s.input} {...register('password')} />
      </div>
      <div className={s.profile}>
        <div>
          <p>パスワード</p>
          <p>(再確認)</p>
        </div>
        <input type='password' className={s.input} {...register('passwordConfirmation')} />
      </div>
      <div className={s.submit}>
        <button type='submit' className={s.button}>
          Update password
        </button>
      </div>
      <div className={s.status}>
        {success && <p className={s.success}>パスワードを更新しました</p>}
        {errorMessage && <p className={s.error}>{errorMessage}</p>}
      </div>
    </form>
  );
};

export default PasswordResetForm;
