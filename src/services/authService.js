const API_BASE_URL = 'http://localhost:3002';
export const login = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  if (!response.ok) {
    throw new Error('Échec de la connexion');
  }
  return response.json();
};

export const register = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  if (!response.ok) {
    throw new Error('Échec de l’inscription');
  }
  return response.json();
};
