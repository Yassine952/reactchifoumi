import MatchListPage from "../components/MatchListPage";

const MatchesPage = () => {
  return (
    <MatchListPage
      title="Liste des parties en cours"
      filter={(matches) =>
        matches.filter(
          (match) =>
            (match.winner === undefined || match.winner === null) && 
            !(match.turns.length > 0 && match.turns.every((turn) => turn.winner === "draw"))
        )
      }
    />
  );
};

export default MatchesPage;
