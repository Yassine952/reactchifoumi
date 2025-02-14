import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useSSEListener from "../hooks/useSSEListener";
import notyf from "../utils/notyf";
import { launchConfetti } from "../utils/confetti";
import { isMatchFinished, getMatch } from "../services/matchService";

const MatchDetail = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [matchResult, setMatchResult] = useState(null);
  const matchEndedNotified = useRef(false);

  // Callback SSE pour gérer les événements reçus
  const handleSSEEvent = useCallback(
    (data) => {
      console.log("Données reçues via SSE :", data);

      // S'assurer que data est toujours un tableau
      const events = Array.isArray(data) ? data : [data];

      events.forEach((event) => {
        console.log("Type d'événement reçu :", event.type);

        if (event.type === "TURN_ENDED") {
          console.log(
            `Tour ${event.payload.newTurnId - 1} terminé, gagnant: ${event.payload.winner}`
          );
          getMatch(matchId, token)
            .then((data) => {
              setMatch(data);
              setCurrentTurn(data.turns.length + 1);
            })
            .catch((error) => {
              console.error("Erreur lors de la récupération du match", error);
            });
        } else if (event.type === "MATCH_ENDED") {
          if (matchEndedNotified.current) return;
          matchEndedNotified.current = true; // On marque comme notifié

          const username = localStorage.getItem("username");
          const winner = event.payload.winner;
          console.log("MATCH TERMINÉ ! Gagnant :", winner);

          if (winner === "draw") {
            setMatchResult("ÉGALITÉ");
            notyf.success("Égalité !");
            launchConfetti();
          } else if (username === winner) {
            setMatchResult("VICTOIRE");
            notyf.success("Victoire !");
            launchConfetti();
          } else {
            setMatchResult("DÉFAITE");
            notyf.error("Vous avez perdu...");
          }

          // On marque le match comme terminé pour désactiver l'interface
          setMatch((prevMatch) => ({
            ...prevMatch,
            ended: true,
          }));
        }
      });
    },
    [matchId, token]
  );

  // Définir l'activation de l'écoute SSE : on arrête dès que le match est terminé.
  const isActive = match ? !match.ended : true;
  useSSEListener(matchId, token, handleSSEEvent, isActive);

  // Récupération initiale du match
  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/matches/${matchId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Réponse API :", response.data);

        if (!response.data || Object.keys(response.data).length === 0) {
          throw new Error("Match non trouvé !");
        }

        setMatch(response.data);
        setCurrentTurn((prevTurn) =>
          Math.max(prevTurn, response.data.turns.length + 1)
        );

        // Le loader reste affiché au minimum 500ms
        setTimeout(() => {
          setLoading(false);
        }, 500);
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
      notyf.error("Ce n'était pas à vous de jouer !");
      console.error("Erreur lors de l'envoi du coup", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-20">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </div>
    );
  }

  // Fonction de traduction
  const translateMove = (move) => {
    switch (move) {
      case "rock":
        return "pierre";
      case "paper":
        return "papier";
      case "scissors":
        return "ciseaux";
      default:
        return move;
    }
  };

  if (!match) return <p>Match introuvable.</p>;

  return (
    <div className="flex flex-col items-center justify-center mt-16 text-gray-900">
      <h2 className="text-xl font-bold mb-5">Match ID : {match._id}</h2>
      {matchResult && (
        <p
          className={`text-5xl font-bold mt-2 mb-5 ${
            matchResult === "VICTOIRE"
              ? "text-green-500"
              : matchResult === "DÉFAITE"
              ? "text-red-500"
              : matchResult === "ÉGALITÉ"
              ? "text-gray-500"
              : ""
          }`}
        >
          {matchResult}
        </p>
      )}
      <p>
        <strong>Joueur 1 :</strong>{" "}
        <span className={match.user1 && match.user1.username === localStorage.getItem("username") ? "text-red-500 font-bold text-decoration-line: underline" : ""}>
          {match.user1 ? match.user1.username : "En attente"}
        </span>
      </p>
      <p>
        <strong>Joueur 2 :</strong>{" "}
        <span className={match.user2 && match.user2.username === localStorage.getItem("username") ? "text-red-500 font-bold text-decoration-line: underline" : ""}>
          {match.user2 ? match.user2.username : "En attente"}
        </span>
      </p>
      {match.user2 && !isMatchFinished(match) && (
        <div className="mt-4">
          <p className="font-bold">Tour actuel : {currentTurn}</p>
          <p className="mt-2 mb-5">Fais ton choix :</p>
          <div className="flex space-x-4">
            <img
              src="/images/rock.jpg"
              alt="Pierre"
              className="w-40 h-40 rounded-lg cursor-pointer hover:scale-110 transition"
              onClick={() => handleMove("rock")}
            />
            <img
              src="/images/paper.jpeg"
              alt="Papier"
              className="w-40 h-40 rounded-lg cursor-pointer hover:scale-110 transition"
              onClick={() => handleMove("paper")}
            />
            <img
              src="/images/scissors.jpg"
              alt="Ciseaux"
              className="w-40 h-40 rounded-lg cursor-pointer hover:scale-110 transition"
              onClick={() => handleMove("scissors")}
            />
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <h3 className="text-lg font-bold">Historique des tours</h3>
        {!match.user2 ? (
          <p className="mt-4 text-center text-gray-700">
            Pas d'adversaire, actualisez la page dans quelques instants, un adversaire va venir.
          </p>
        ) : match.turns.length === 0 ? (
          <p className="mt-4 text-center text-gray-700">
            Aucun tour n'a été joué pour le moment.
          </p>
        ) : (
          <ul className="mt-2">
            {match.turns.map((turn, index) => (
              <li key={index} className="bg-white shadow rounded-lg p-4 mb-4 px-28">
                <p>
                  <strong>Tour {index + 1}</strong>
                </p>
                <p>
                  <strong>{match.user1.username}</strong> a joué :{" "}
                  <em>{translateMove(turn.user1)}</em>
                </p>
                <p>
                  <strong>{match.user2.username}</strong> a joué :{" "}
                  <em>{translateMove(turn.user2)}</em>
                </p>
                <p>
                  <strong>Gagnant :</strong>{" "}
                  {turn.winner === "draw"
                    ? "Égalité"
                    : turn.winner === "user1"
                    ? match.user1.username
                    : turn.winner === "user2"
                    ? match.user2.username
                    : "Inconnu"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MatchDetail;