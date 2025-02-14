import MatchListPage from "../components/MatchListPage";
import { isMatchFinished } from "../services/matchService";

const MatchesPage = () => {
  return (
    <MatchListPage
      title="Liste des parties en cours"
      showCreateButton={true}
      filter={(matches) =>
        matches.filter(
          (match) =>
            !isMatchFinished(match)
        )
      }
    />
  );
};

export default MatchesPage;
