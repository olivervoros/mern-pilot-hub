import { createContext, useState } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';

type AuthState = {
  email?: string;
  password?: string;
  accessToken?: string;
};

type AuthContextType = {
  auth: AuthState;
  setAuth: Dispatch<SetStateAction<AuthState>>;
};

const AuthContext = createContext<AuthContextType>({
  auth: {},
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
