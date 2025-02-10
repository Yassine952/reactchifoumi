import React from 'react';
import AuthForm from '../components/AuthForm/AuthForm';
import notyf from "../utils/notyf";

const AuthPage = () => {
  return (
    <div className="auth-page"> 
      <h1>Bienvenue sur l'application Chifoumi</h1>
      <AuthForm />
    </div>
  );
};

export default AuthPage;
