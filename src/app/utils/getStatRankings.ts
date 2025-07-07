export type RankingEntry = {
  player: string;
  value: number;
  extra?: string;
  course?: string;
  date?: string;
};

export type Rankings = {
  most_opens: RankingEntry[];
  most_rds_below_80: RankingEntry[];
  best_avg_score: RankingEntry[];
  most_total_strokes: RankingEntry[];
  lowest_individual_scores: RankingEntry[];
  lowest_winners_average_scores: RankingEntry[];
};

export function getStatRankings(players: any, tournament_data: any): Rankings {
  const rankings: Rankings = {
    most_opens: [],
    most_rds_below_80: [],
    best_avg_score: [],
    most_total_strokes: [],
    lowest_individual_scores: [],
    lowest_winners_average_scores: [],
  };

  const roundsBelow80: { [player: string]: number } = {};
  const individualScores: RankingEntry[] = [];
  const winners: RankingEntry[] = [];

  Object.entries(players).forEach(([player, data]: [string, any]) => {
    // Best Average Score
    rankings.best_avg_score.push({ player, value: data.average_score });

    // Most Total Strokes
    rankings.most_total_strokes.push({ player, value: data.total_strokes });

    // Most Opens Played
    rankings.most_opens.push({ player, value: data.total_opens_num });

    // Rounds Below 80 and Individual Scores
    let below80Count = 0;
    data.player_opens_data.forEach((open: any) => {
      open.rounds.forEach((round: any) => {
        if (round.score > 0) {
          individualScores.push({
            player,
            value: round.score,
            course: round.course,
            date: round.date,
          });

          if (round.score < 80) {
            below80Count++;
          }
        }
      });
    });

    if (below80Count > 0) {
      roundsBelow80[player] = below80Count;
    }
  });

  // Collect winners from tournament_data
  tournament_data.forEach((tournament: any) => {
    const { champion_full_name, players, year } = tournament;
    const winner = players.find(
      (p: any) => p.player_full_name === champion_full_name
    );

    if (winner && winner.scores.length > 0) {
      const total = winner.scores.reduce(
        (sum: number, score: number) => sum + score,
        0
      );
      const average = total / winner.scores.length;

      winners.push({
        player: champion_full_name,
        value: average,
        extra: `${year}`,
      });
    }
  });

  // Sort winners by lowest average score
  winners.sort((a, b) => a.value - b.value);

  // Assign winners to the rankings
  rankings.lowest_winners_average_scores = winners;

  // Sort Rankings
  rankings.best_avg_score.sort((a, b) => a.value - b.value);
  rankings.most_total_strokes.sort((a, b) => b.value - a.value);
  rankings.most_opens.sort((a, b) => b.value - a.value);

  rankings.lowest_individual_scores = individualScores.sort(
    (a, b) => a.value - b.value
  );
  rankings.most_rds_below_80 = Object.entries(roundsBelow80)
    .map(([player, value]: [string, any]) => ({ player, value }))
    .sort((a, b) => b.value - a.value);

  return rankings;
}
