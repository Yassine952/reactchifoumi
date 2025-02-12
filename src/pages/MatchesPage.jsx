import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { getMatches, createMatch } from '../services/matchService';
import MatchesList from '../components/MatchesList';

const MatchesPage = () => {
  const { token } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchMatches = async () => { // Ici on récupère uniquement les matchs en cours
    setLoading(true);
    try {
      const data = await getMatches(token);

      const ongoingMatches = data.filter(match => {
        const noWinnerYet = match.winner === undefined || match.winner === null; // Vérifie si winner est undefined ou null
        
        const allTurnsAreDraws = match.turns.length > 0 && match.turns.every(turn => turn.winner === "draw"); // Vérifie si tous les tours sont des égalités
  
        return noWinnerYet && !allTurnsAreDraws; // Un match est en cours s'il n'a pas de gagnant ET s'il y a au moins un tour non égalitaire
      });
      setMatches(ongoingMatches);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMatch = async () => {
    try {
      const newMatch = await createMatch(token);
      setMatches((prev) => [newMatch, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (token === null) return;
    if (!token) {
      navigate('/auth');
    } else {
      fetchMatches();
    }
  }, [token, navigate]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des parties</h1>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleCreateMatch}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4"
      >
        Créer une partie
      </button>
      {loading ? <p>Chargement...</p> : <MatchesList matches={matches} />}
    </div>
  );
};

export default MatchesPage;
