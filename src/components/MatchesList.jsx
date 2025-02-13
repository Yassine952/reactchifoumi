import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { isMatchFinished } from "../services/matchService";
import ButtonLink from "./ButtonLink";

const MatchesList = ({ matches }) => {
  const { user } = useContext(AuthContext); 

  return (
    <div>
      {matches.length === 0 ? (
        <p>Aucune partie trouvée.</p>
      ) : (
        matches.map((match) => {
          let matchResult = "En cours";

          if (isMatchFinished(match)) {
            if (!match.winner) {
              matchResult = "Égalité";
            } else {
              matchResult = match.winner.username === user.username ? "Gagné" : "Perdu";
            }
          }

          return (
            <div key={match._id} className="border p-4 mb-2 rounded">
              <p><strong>ID du match :</strong> {match._id}</p>
              <p><strong>Joueur 1 :</strong> {match.user1?.username || 'Inconnu'}</p>
              <p><strong>Joueur 2 :</strong> {match.user2?.username || 'En attente'}</p>

              <p className="mt-2 font-bold">
                Statut : <span className={
                  matchResult === "Gagné" ? "text-green-500" 
                  : matchResult === "Perdu" ? "text-red-500" 
                  : matchResult === "Égalité" ? "text-gray-500" 
                  : "text-blue-500"
                }>
                  {matchResult}
                </span>
              </p>

              <div className="mt-3">
                <ButtonLink to={`/matches/${match._id}`} className="mt-2">
                  Voir le match
                </ButtonLink>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MatchesList;
