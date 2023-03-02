import React, { useContext, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'src/store/user';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (!!userParams) {
      setIsAuthenticated(true);
      setCurrentUser(userParams);
    }else{
      setIsAuthenticated(false);
      setCurrentUser(undefined);
    }
  }, [userParams]);

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
