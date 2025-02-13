import MatchListPage from "../components/MatchListPage";
import { isMatchFinished } from "../services/matchService"; // ✅ Ajoute l'import


const HistoryPage = () => {
  return (
    <MatchListPage
      title="Historique des parties"
      filter={(matches) =>
        matches.filter(
          (match) =>
            isMatchFinished(match)
        )
      }
    />
  );
};

export default HistoryPage;