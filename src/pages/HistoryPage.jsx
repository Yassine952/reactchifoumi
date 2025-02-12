import MatchListPage from "../components/MatchListPage";

const HistoryPage = () => {
  return (
    <MatchListPage
      title="Historique des parties"
      filter={(matches) =>
        matches.filter(
          (match) =>
            match.winner !== undefined && match.winner !== null ||
            (match.turns.length > 0 && match.turns.every((turn) => turn.winner === "draw"))
        )
      }
    />
  );
};

export default HistoryPage;