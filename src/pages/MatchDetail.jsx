import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useSSEListener from "../hooks/useSSEListener";
import notyf from "../utils/notyf";
import { launchConfetti } from '../utils/confetti';

const MatchDetail = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // On mémorise le callback SSE pour éviter qu'il soit recréé à chaque rendu
  const handleSSEEvent = useCallback((data) => {
    console.log("Données reçues via SSE :", data);
    
    // S'assurer que data est toujours un tableau
    const events = Array.isArray(data) ? data : [data];

    events.forEach((event) => {
      console.log("Type d'événement reçu :", event.type);

      if (event.type === "TURN_ENDED") {
        console.log(`Tour ${event.payload.newTurnId - 1} terminé, gagnant: ${event.payload.winner}`);
        setCurrentTurn(event.payload.newTurnId);
      } else if (event.type === "MATCH_ENDED") {
        const username = localStorage.getItem("username");
        const winner = event.payload.winner;
        console.log("MATCH TERMINÉ ! Gagnant :", winner);

        if (username === winner) {
          notyf.success("Victoire !");
          launchConfetti();
        } else if (winner === "draw") {
          notyf.error("Égalité !");
          success();
        } else {
          notyf.error("Vous avez perdu...");
        }

        // Marquer le match comme terminé pour désactiver l'interface de jeu
        setMatch((prevMatch) => ({
          ...prevMatch,
          ended: true,
        }));
      }
    });
  }, []);

  // Définir l'activation de l'écoute SSE : on arrête dès que le match est terminé.
  const isActive = match ? !match.ended : true;
  useSSEListener(matchId, token, handleSSEEvent, isActive);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/matches/${matchId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Réponse API :", response.data);

        if (!response.data || Object.keys(response.data).length === 0) {
          throw new Error("Match non trouvé !");
        }

        setMatch(response.data);
        // Le tour initial est basé sur le nombre de tours déjà joués
        setCurrentTurn(response.data.turns.length + 1);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération du match", error);
        setLoading(false);
      }
    };

    fetchMatch();
  }, [matchId, token]);

  const handleMove = async (move) => {
    try {
      const response = await axios.post(
        `http://localhost:3002/matches/${matchId}/turns/${currentTurn}`,
        { move },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Coup joué :", response.data);
      setMatch((prevMatch) => ({
        ...prevMatch,
        turns: [...prevMatch.turns, { [match.user1.username]: move }],
      }));
    } catch (error) {
      notyf.error("Ce n'était pas à vous de jouer !")
      console.error("Erreur lors de l'envoi du coup", error);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (!match) return <p>Match introuvable.</p>;

  return (
    <div className="flex flex-col items-center justify-center mt-16 text-gray-900">
      <h2 className="text-xl font-bold">Match ID : {match._id}</h2>
      <p><strong>Joueur 1 :</strong> {match.user1.username}</p>
      <p>
        <strong>Joueur 2 :</strong> {match.user2 ? match.user2.username : "En attente"}
      </p>

      {match.user2 && !match.ended && (
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