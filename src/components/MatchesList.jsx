import React from 'react';
import { Link } from 'react-router-dom';

const MatchesList = ({ matches }) => {
  if (!matches.length) {
    return <p>Aucune partie trouvée.</p>;
  }
  return (
    <div>
      {matches.map((match) => (
        <div key={match._id} className="border p-4 mb-2 rounded">
          <p><strong>ID du match :</strong> {match._id}</p>
          <p>
            <strong>Joueur 1 :</strong> {match.user1?.username || 'Inconnu'}<br />
            <strong>Joueur 2 :</strong> {match.user2 ? match.user2.username : 'En attente'}
          </p>
          <Link to={`/matches/${match._id}`} className="text-blue-500 hover:underline">
            Voir le match
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MatchesList;
