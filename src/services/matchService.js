const API_BASE_URL = 'http://localhost:3002'; 

export const getMatches = async (token, queryParams) => {
  const query = queryParams ? '?' + new URLSearchParams(queryParams) : '';
  const response = await fetch(`${API_BASE_URL}/matches${query}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des parties.');
  }
  return response.json();
};

export const createMatch = async (token) => {
  const response = await fetch(`${API_BASE_URL}/matches`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.match || 'Erreur lors de la création du match.');
  }
  return response.json();
};

export const isMatchFinished = (match) => {
  const maxTurns = 3;
  if (match.turns.length >= maxTurns) return true;
};
