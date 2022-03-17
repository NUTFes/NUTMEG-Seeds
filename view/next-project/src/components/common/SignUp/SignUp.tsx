import React, { FC, useState } from 'react';
import Router from 'next/router';
import { post } from '@utils/api_methods';
import SubmitButton from '@components/common/TestButton';
import s from './SignUp.module.css';

interface submitData {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const submitUser = async (data: submitData) => {
  const submitUrl =
    process.env.CSR_API_URI +
    '/api/auth/?name=' +
    data.userName +
    '&email=' +
    data.email +
    '&password=' +
    data.password +
    '&password_confirmation=' +
    data.passwordConfirmation;
  console.log(submitUrl)
  const req: any = await post(submitUrl, '');
  const res: any = await req.json()
  if (req.status === 200) {
    localStorage.setItem('access-token', req.headers['access-token']);
    localStorage.setItem('client', req.headers['client']);
    localStorage.setItem('uid', req.headers['uid']);
    localStorage.setItem('token-type', req.headers['token-type']);
    localStorage.setItem('user_id', res.data.id);
    Router.push('/user_detail');
  } else {
    console.log('Error' + res.status);
    console.log(res);
  }
};

const SignUp: FC = () => {
  const [formData, setFormData] = useState({ userName: '', email: '', password: '', passwordConfirmation: '' });
  const handler = (input: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(formData.userName);
    setFormData({ ...formData, [input]: e.target.value });
  };

  return (
    <>
      <div className={s.formContainer}>
        <div>
          <h3>Name</h3>
          <input type='text' placeholder='Input' value={formData.userName} onChange={handler('userName')} />
          <p>例: 木実太郎</p>
        </div>
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
        <div>
          <h3>Password Confirmation</h3>
          <input
            type='password'
            placeholder='Input'
            value={formData.passwordConfirmation}
            onChange={handler('passwordConfirmation')}
          />
          <p className={s.formExample}>例: 木実太郎</p>
        </div>
        <SubmitButton onClick={() => submitUser(formData)}>Next</SubmitButton>
      </div>
    </>
  );
};

export default SignUp;
