import React, { createContext, useContext, useState, ReactNode } from 'react';
import api from '../services/api';

interface UserDataInterface{
  email: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  userLogin: (userData: UserDataInterface) => Promise<void>;
  errorMessage: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem('token')
  );

  const [errorMessage, setErrorMessage] = useState<string>('');

  console.log('errorMessage: ', errorMessage)

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const userLogin = async ({email, password}: UserDataInterface)=>{
    setErrorMessage(''); // Limpa a mensagem de erro antes de tentar fazer login
    try {
      const response = await api.post('/api/users/login', { 
        email,
        password 
      });

      if (response.status === 200) {
        const token = response.data.token;
        login(token); // Chama a função de login com o token recebido
      } else {
        setErrorMessage('Login failed');
      }
      
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('Invalid credentials'); // Mensagem de erro vinda do backend
      } else {
        setErrorMessage('An error occurred during login');
      }
 
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,userLogin, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};