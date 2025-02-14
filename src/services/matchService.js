const API_BASE_URL = 'https://chifoumi.kmarques.dev'; 
import notyf from "../utils/notyf";
import axios from "axios";

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
    notyf.error(errorData.match);
    throw new Error(errorData.match || 'Erreur lors de la création du match.');
  }
  return response.json();
};

export const isMatchFinished = (match) => {
  const maxTurns = 3;
  if (match.turns.length >= maxTurns) return true;
};

export const getMatch = async (matchId, token) => {
  const response = await axios.get(`${API_BASE_URL}/matches/${matchId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};