import React from 'react';
import AuthForm from '../components/AuthForm/AuthForm';
import notyf from "../utils/notyf";

const AuthPage = () => {
  return (
    <div className="auth-page flex flex-col items-center justify-center mt-16 text-gray-900"> 
      <h1>Bienvenue sur l'application Chifoumi</h1>
      <AuthForm />
    </div>
  );
};

export default AuthPage;
