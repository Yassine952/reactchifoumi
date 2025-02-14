import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      navigate('/matches');
    } catch (err) {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name mb-2'>Nom d'utilisateur :</label>
        <input
          className='appearance-none block w-full text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Votre nom d'utilisateur"
        />
      </div>
      <div>
        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name mb-2'>Mot de passe :</label>
        <input
          className='appearance-none block w-full text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Votre mot de passe"
        />
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" type="submit">S'inscrire</button>
    </form>
  );
};

export default RegisterForm;
