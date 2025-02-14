import MatchListPage from "../components/MatchListPage";
import { isMatchFinished } from "../services/matchService";
import Statistics from "../components/Statistics";


const HistoryPage = () => {
  return (
    <>
    
    <Statistics />
    <MatchListPage
      title="Historique des parties"
      filter={(matches) =>
        matches.filter(
          (match) =>
            isMatchFinished(match)
        )
      }
    />
    </>
    
  );
};

export default HistoryPage;