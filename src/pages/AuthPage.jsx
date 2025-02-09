import React from 'react';
import AuthForm from '../components/AuthForm/AuthForm';
import notyf from "../utils/notyf";

const AuthPage = () => {
  return (
    // bg-red-400 pour tester tailwind
    <div className="auth-page bg-red-400"> 
      <h1>Bienvenue sur l'application Chifoumi</h1>
      <AuthForm />
    </div>
  );
};

// Mise en place de la notyf uniquement pour tester l'installation
notyf.success("Bienvenue sur l'application.");

export default AuthPage;
