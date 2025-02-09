import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-toggle">
        <button onClick={() => setIsLogin(true)} style={{ fontWeight: isLogin ? 'bold' : 'normal' }}>
          Connexion
        </button>
        <button onClick={() => setIsLogin(false)} style={{ fontWeight: !isLogin ? 'bold' : 'normal' }}>
          Inscription
        </button>
      </div>
      <div className="auth-form">
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default AuthForm;
