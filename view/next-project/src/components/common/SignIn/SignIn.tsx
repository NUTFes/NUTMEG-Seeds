import React, { FC, useState } from 'react';
import Router from 'next/router';
import { post } from '@utils/api_methods';
import SubmitButton from '@components/common/TestButton';
import s from './SignIn.module.css';
import { useRecoilState } from 'recoil';
import { userState } from 'src/store/user';
import { SetterOrUpdater } from 'recoil';

interface submitData {
  email: string;
  password: string;
}

interface User {
  accessToken: string
  client: string
  uid: string
  tokenType: string
  userId: string
}

export const submitUser = async (data: submitData, setUser: SetterOrUpdater<User | undefined>, setErrorMessage: Function) => {
  const submitUrl = process.env.CSR_API_URI + '/api/auth/sign_in?email=' + data.email + '&password=' + data.password;
  const req: any = await post(submitUrl, '');
  const res: any = await req.json();
  if (req.status === 200) {
    const userParams = {
      accessToken: req.headers.get('access-token'),
      client: req.headers.get('client'),
      uid: req.headers.get('uid'),
      tokenType: req.headers.get('token-type'),
      userId: res.data.id,
    };
    setUser(userParams);
    Router.push('/records');
  }else{
    setErrorMessage('メールアドレスまたはパスワードが間違っています');
  }
};

const SignIn: FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [user, setUser] = useRecoilState(userState);
  const [errorMessage, setErrorMessage] = useState('');
  const handler = (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [input]: e.target.value });
  };
  return (
    <>
      <div className={s.formContainer}>
        <div>
          <h3>Email</h3>
          <input type='text' placeholder='Input' value={formData.email} onChange={handler('email')} />
          <p>例: nutmeg-taro@email.com</p>
        </div>
        <div>
          <h3>Password</h3>
          <input type='password' placeholder='Input' value={formData.password} onChange={handler('password')} />
          <p className={s.formExample}>例: 木実太郎</p>
        </div>
        <SubmitButton onClick={() => submitUser(formData, setUser, setErrorMessage)}>Login</SubmitButton>
        {errorMessage && <p className={s.error}>{errorMessage}</p>}
      </div>
    </>
  );
};

export default SignIn;
