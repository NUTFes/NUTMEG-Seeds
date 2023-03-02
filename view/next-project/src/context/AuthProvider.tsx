import React, { useContext, useState, useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'src/store/user';
import Router from 'next/router';

interface User {
  accessToken: string
  client: string
  uid: string
  tokenType: string
  userId: string
}

interface Props {
  children: React.ReactNode;
}

interface AuthContext {
  isAuthenticated: boolean;
  currentUser: User | undefined;
}

const AuthContext = React.createContext<AuthContext>({
  isAuthenticated: false,
  currentUser: undefined
});

const AuthProvider = (props: Props) => {
  const userParams = useRecoilValue(userState);

  const isAuthenticated= useMemo(() => {
    return !!userParams;
  }, [userParams]);

  const currentUser = useMemo(() => {
    return !!userParams ? userParams : undefined;
  }, [userParams]);

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push('/');
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}

export default AuthProvider;
