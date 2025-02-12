import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getMatches } from "../services/matchService";
import MatchesList from "./MatchesList";

const MatchListPage = ({ title, filter }) => {
  const { token } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const data = await getMatches(token);
      setMatches(filter(data)); // On applique le filtre passé en paramètre : soit les parties en cours soit les parties finies
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMatches();
    }
  }, [token]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? <p>Chargement...</p> : <MatchesList matches={matches} />}
    </div>
  );
};

export default MatchListPage;