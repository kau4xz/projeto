// src/contexts/AuthContext.js

import React, { createContext, useState, useContext } from 'react';

// Criar o contexto
const AuthContext = createContext();

// Criar um hook personalizado para facilitar o uso do contexto
export const useAuth = () => useContext(AuthContext);

// Criar o provedor de contexto
export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Os valores que você deseja que sejam acessíveis em todo o aplicativo
  const value = {
    email,
    setEmail,
    senha,
    setSenha
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
