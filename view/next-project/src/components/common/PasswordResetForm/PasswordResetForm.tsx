import { put_with_token } from '@utils/api_methods';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import s from './PasswordResetForm.module.css';
import { useAuth } from 'src/context/AuthProvider';

interface FormData {
  password: string;
  passwordConfirmation: string;
}

export const PasswordResetForm = () => {
  const { currentUser } = useAuth();

  const { register, handleSubmit, watch } = useForm<FormData>({
    mode: 'onChange',
  });

  const watchPassword = watch('password');
  const watchPasswordConfirmation = watch('passwordConfirmation');

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const onSubmit = async (data: FormData) => {
    const putUrl = process.env.CSR_API_URI + '/auth';
    const submitData = {
      password: data.password
    };
    const putRes = await put_with_token(putUrl, submitData, currentUser);
    console.log(await putRes.json());
    if (putRes.status === 200) {
      setSuccess(true);
      setErrorMessage('');
    } else {
      setSuccess(false);
      setErrorMessage('パスワードの更新に失敗しました');
    }
  };

  const messageResetHandler = () => {
    setSuccess(false);
    setErrorMessage('');
  };

  useEffect(() => {
    messageResetHandler();

    if (watchPassword && watchPasswordConfirmation && watchPassword.length > 0 && watchPasswordConfirmation.length > 0) {
      if (watchPassword !== watchPasswordConfirmation) {
        setErrorMessage('パスワードが一致しません');
      } else {
        setErrorMessage('');
      }
    }
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
          Profile Settings
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
