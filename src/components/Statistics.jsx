import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getMatches, isMatchFinished } from "../services/matchService";

const Statistics = () => {
  const { token } = useContext(AuthContext);
  const [stats, setStats] = useState({ wins: 0, losses: 0, draws: 0, total: 0 });
  
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const matches = await getMatches(token);
        // Ne garder que les matchs terminés (au moins 3 tours)
        const finishedMatches = matches.filter(match => isMatchFinished(match));
        const currentUser = localStorage.getItem("username");
        
        // Calcul des statistiques
        const wins = finishedMatches.filter(
          match => match.winner && match.winner.username === currentUser
        ).length;
        // Considérer un match nul si winner === "draw" OU si winner n'est pas défini
        const draws = finishedMatches.filter(
          match => !match.winner || match.winner === "draw"
        ).length;
        const losses = finishedMatches.filter(
          match =>
            match.winner &&
            match.winner.username !== currentUser &&
            match.winner !== "draw"
        ).length;
        
        setStats({
          wins,
          draws,
          losses,
          total: finishedMatches.length,
        });
      } catch (err) {
        console.error("Erreur lors de la récupération des statistiques", err);
      }
    };
    
    fetchStatistics();
  }, [token]);
  
  return (
    <div className="statistics-container p-4 bg-white shadow rounded-lg my-4">
      <h2 className="text-xl font-bold mb-4">Statistiques des parties jouées (+1 pts)</h2>
      <p><strong>Parties jouées :</strong> {stats.total}</p>
      <p><strong>Victoires :</strong> {stats.wins}</p>
      <p><strong>Défaites :</strong> {stats.losses}</p>
      <p><strong>Égalités :</strong> {stats.draws}</p>
    </div>
  );
};

export default Statistics;
