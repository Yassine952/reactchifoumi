import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container mt-14">
      <div className="auth-toggle">
        <div className='mb-5'>
          <button onClick={() => setIsLogin(true)} className={isLogin ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600 mr-4" : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100 mr-4"}>
          Connexion
        </button>
        <button onClick={() => setIsLogin(false)} className={!isLogin ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600" : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"}>
          Inscription
        </button>
        </div>
      </div>
      <div className="auth-form">
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default AuthForm;
