import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getMatches, isMatchFinished } from "../services/matchService";
import { div } from "framer-motion/client";

const Statistics = () => {
  const { token } = useContext(AuthContext);
  const [stats, setStats] = useState({ wins: 0, losses: 0, draws: 0, total: 0 });
  
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const matches = await getMatches(token);
        // Filtrer uniquement les matchs terminés
        const finishedMatches = matches.filter(match => isMatchFinished(match));
        const currentUser = localStorage.getItem("username");
        
        // Calcul des statistiques
        const wins = finishedMatches.filter(
          match => match.winner && match.winner.username === currentUser
        ).length;
        const draws = finishedMatches.filter(
          match => match.winner === "draw"
        ).length;
        const losses = finishedMatches.filter(
          match => match.winner && match.winner.username !== currentUser && match.winner !== "draw"
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📊 Statistiques des parties jouées</h1>
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <p><strong>Parties jouées :</strong> {stats.total}</p>
        <p><strong>Victoires :</strong> {stats.wins}</p>
        <p><strong>Défaites :</strong> {stats.losses}</p>
        <p><strong>Égalités :</strong> {stats.draws}</p>
      </div>
    </div>
  );
};

export default Statistics;