import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useSSEListener from "../hooks/useSSEListener"; 

const MatchDetail = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token"); // Récupération du token JWT

  useSSEListener(matchId, token, (data) => {
    console.log("Mise à jour via SSE :", data);
    if (data.type === "NEW_TURN") {
      setCurrentTurn(data.payload.turnId);
    }
  });

  useEffect(() => {
    const fetchMatch = async () => {
        try {
          const response = await axios.get(`http://localhost:3002/matches/${matchId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
      
          console.log("Réponse API :", response.data); // DEBUG
      
          if (!response.data || Object.keys(response.data).length === 0) {
            throw new Error("Match non trouvé !");
          }
      
          setMatch(response.data);
          setCurrentTurn(response.data.turns.length + 1); // Définit le prochain tour
          setLoading(false);
        } catch (error) {
          console.error("Erreur lors de la récupération du match", error);
          setLoading(false); // Arrêter le chargement même en cas d'erreur
        }
      };
      

    fetchMatch();
  }, [matchId, token]);

  const handleMove = async (move) => {
    try {
      await axios.post(
        `http://localhost:3002/matches/${matchId}/turns/${currentTurn}`,
        { move },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Coup joué !");
      window.location.reload(); // Recharge la page pour voir la mise à jour
    } catch (error) {
      console.error("Erreur lors de l'envoi du coup", error);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (!match) return <p>Match introuvable.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Match ID : {match._id}</h2>
      <p>
        <strong>Joueur 1 :</strong> {match.user1.username}
      </p>
      <p>
        <strong>Joueur 2 :</strong> {match.user2 ? match.user2.username : "En attente"}
      </p>

      {match.user2 && (
        <div className="mt-4">
          <p className="font-bold">Tour actuel : {currentTurn}</p>
          <p>Fais ton choix :</p>
          <div className="flex space-x-4">
            <button className="btn" onClick={() => handleMove("rock")}>
              Pierre
            </button>
            <button className="btn" onClick={() => handleMove("paper")}>
              Papier
            </button>
            <button className="btn" onClick={() => handleMove("scissors")}>
              Ciseaux
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchDetail;
