import React from 'react';
import { Link } from 'react-router-dom';
import ButtonLink from "./ButtonLink";


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
            <div className='mt-3'>
              <ButtonLink to={`/matches/${match._id}`}>Voir le match</ButtonLink>
            </div>
        </div>
      ))}
    </div>
  );
};

export default MatchesList;
