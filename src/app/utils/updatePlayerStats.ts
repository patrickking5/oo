import {
  IndividualTournamentData,
  OverallTourneyStats,
} from "@/types/tourney_types"; // Use alias `@/` for cleaner imports

import { PlayerSingleTourneyData } from "@/types/player_types"; // Use alias `@/` for cleaner imports
const legacies = ["Mike King", "Jeff King", "Mark Oakley", "Mike Maher"];

export const updatePlayerStats = (
  player_stats: Record<string, any>,
  overall_tourney_stats: OverallTourneyStats,
  tournamentData: IndividualTournamentData
): Record<string, any> => {
  // Initialize overall_course_stats if undefined
  if (!overall_tourney_stats.overall_course_stats) {
    overall_tourney_stats.overall_course_stats = {};
  }

  var updated_player_stats = player_stats;

  const formatRounds = (scores: any) => {
    var rounds: {
      score: number;
      course: string;
      date: string;
    }[] = [];
    scores.forEach((score: number, index: number) => {
      rounds.push({
        score: score,
        course: tournamentData.courses[index],
        date: tournamentData.dates[index],
      });
    });
    return rounds;
  };

  const calcAverage = (scores: any) => {
    var number_of_eligible_scores = 0;
    var total_strokes = 0;

    scores.forEach((score: number, index: number) => {
      if (score > 0) {
        number_of_eligible_scores += 1;
        total_strokes += score;
      }
    });
    return Math.round((total_strokes / number_of_eligible_scores) * 100) / 100;
  };

  const allPlayers: PlayerSingleTourneyData[] = [
    ...tournamentData.players,
    ...tournamentData.ineligible_players,
  ];

  const t_stats = {
    t_avg_round_score: 0,
    t_avg_total_score: 0,
    t_num_full_players_per_round: [0, 0, 0],
    t_num_partial_players_per_round: [0, 0, 0],
    t_num_full_players: tournamentData.players.length,
    t_num_partial_players: tournamentData.ineligible_players.length,
    t_rounds_played: 0,
    t_mov: 0,
    t_avg_round_scores: [-1, -1, -1],
    t_total_round_strokes: [0, 0, 0],
    t_total_strokes: 0,
  };

  allPlayers.forEach((player: any, index: number) => {
    // var current_player_stats: { player_opens_data: any; total_opens_num: any; eligible_score_history: any; player_full_name?: any; full_opens_log?: { years: never[]; num: number; }; partial_opens_log?: { years: never[]; num: number; }; course_data?: never[]; num_rounds?: number; wins?: number; runner_ups?: number; third_place_finishes?: number; podium_finishes?: number; average_score?: number; };
    var current_player_stats: any;

    // If this player does NOT have stats, initialize them.
    if (!Object.keys(player_stats).includes(player.player_full_name)) {
      // Initialize stats for a new player
      current_player_stats = {
        player_full_name: player.player_full_name,
        player_opens_data: [],
        full_opens_log: { years: [], num: 0 },
        partial_opens_log: { years: [], num: 0 },
        course_data: {},
        total_opens_num: 0,
        num_rounds: 0,
        wins: 0,
        runner_ups: 0,
        third_place_finishes: 0,
        podium_finishes: 0,
        average_score: 0,
        eligible_score_history: [],
        total_strokes: 0,
      };
    } else {
      // Retrieve stats for an existing player
      current_player_stats = player_stats[player.player_full_name];
    }

    // FULL or PARTIAL Open Metric
    const current_type = player.scores.every((score: number) => score > 0)
      ? "full"
      : "partial";

    // Add scores, year, and type to the player_opens_data Metric
    current_player_stats.player_opens_data.push({
      year: tournamentData.year,
      type: current_type,
      rounds: formatRounds(player.scores),
      rank: player.rank,
      total_score: player.totalScore,
      average_score: calcAverage(player.scores),
    });

    // Add 1 to the total opens played in Metric
    current_player_stats.total_opens_num += 1;

    // Loop through scores and add to eligible scores. and add course data
    player.scores.forEach((score: number, index: number) => {
      if (score > 0) {
        current_player_stats.eligible_score_history.push(score);
        current_player_stats.num_rounds += 1;
        t_stats.t_rounds_played += 1;
        t_stats.t_total_strokes += score;
        const current_course = tournamentData.courses[index];

        // UPDATE TOTAL TOURNEY STATS
        t_stats.t_total_round_strokes[index] += score;
        t_stats.t_num_full_players_per_round[index] += 1;
        // UPDATE AVERAGE SCORE FOR THIS ROUND
        t_stats.t_avg_round_scores[index] =
          Math.round(
            (t_stats.t_total_round_strokes[index] /
              t_stats.t_num_full_players_per_round[index]) *
              10
          ) / 10;

        if (!(current_course in current_player_stats.course_data)) {
          current_player_stats.course_data[current_course] = {
            scores: [],
            num_rounds: 0,
            avg: 0,
            total_strokes: 0,
          };
        }

        current_player_stats.course_data[current_course]["scores"].push({
          score: score,
          year: tournamentData.year,
        });
        current_player_stats.course_data[current_course]["num_rounds"] += 1;

        const sum_of_rounds_at_course = current_player_stats.course_data[
          current_course
        ]["scores"].reduce(
          (acc: number, round: { score: number }) => acc + round.score,
          0
        );

        // const sum_of_rounds_at_course = current_player_stats.course_data[
        //   current_course
        // ]["scores"].reduce((acc: number, num: number) => acc + num, 0);
        current_player_stats.course_data[current_course]["avg"] =
          Math.round(
            (sum_of_rounds_at_course /
              current_player_stats.course_data[current_course]["num_rounds"]) *
              100
          ) / 100;
        current_player_stats.course_data[current_course]["total_strokes"] =
          sum_of_rounds_at_course;

        // Update overall_course_stats

        if (!(current_course in overall_tourney_stats.overall_course_stats)) {
          overall_tourney_stats.overall_course_stats[current_course] = {
            total_strokes: 0,
            num_rounds: 0,
            avg: 0,
          };
        }
        overall_tourney_stats.overall_course_stats[
          current_course
        ].total_strokes += score;
        overall_tourney_stats.overall_course_stats[current_course].num_rounds++;
        overall_tourney_stats.overall_course_stats[current_course].avg =
          calcAverage(
            Array(
              overall_tourney_stats.overall_course_stats[current_course]
                .num_rounds
            ).fill(
              overall_tourney_stats.overall_course_stats[current_course]
                .total_strokes /
                overall_tourney_stats.overall_course_stats[current_course]
                  .num_rounds
            )
          );
      }
    });

    const sum_of_rounds = current_player_stats.eligible_score_history.reduce(
      (acc: number, num: number) => acc + num,
      0
    );

    current_player_stats.total_strokes = sum_of_rounds;
    // t_stats.t_total_strokes += sum_of_rounds;
    current_player_stats.average_score =
      Math.round(
        (sum_of_rounds / current_player_stats.eligible_score_history.length) *
          10
      ) / 10;

    if (
      tournamentData.champion_full_name == current_player_stats.player_full_name
    ) {
      current_player_stats.wins += 1;
      current_player_stats.podium_finishes += 1;
    } else if (player.rank == "2nd" || player.rank == "T2") {
      current_player_stats.runner_ups += 1;
      current_player_stats.podium_finishes += 1;
    } else if (player.rank == "3rd" || player.rank == "T3") {
      current_player_stats.third_place_finishes += 1;
      current_player_stats.podium_finishes += 1;
    }

    updated_player_stats[player.player_full_name] = current_player_stats;
  });
  if (tournamentData.players.length > 1) {
    t_stats.t_mov =
      tournamentData.players[1].totalScore -
      tournamentData.players[0].totalScore;
  }

  t_stats.t_avg_total_score =
    Math.round((t_stats.t_total_strokes / t_stats.t_rounds_played) * 3 * 10) /
    10;

  t_stats.t_avg_round_score =
    Math.round((t_stats.t_total_strokes / t_stats.t_rounds_played) * 10) / 10;

  if (tournamentData.champion_full_name in overall_tourney_stats.champions) {
    overall_tourney_stats.champions[tournamentData.champion_full_name].push(
      tournamentData.year
    );
  } else {
    overall_tourney_stats.champions[tournamentData.champion_full_name] = [
      tournamentData.year,
    ];
  }

  var updated_overall_tourney_stats = {
    num_opens: overall_tourney_stats.num_opens + 1,
    num_strokes: overall_tourney_stats.num_strokes + t_stats.t_total_strokes,
    champions: overall_tourney_stats.champions,
    average_score:
      Math.round(
        ((overall_tourney_stats.num_strokes + t_stats.t_total_strokes) /
          (overall_tourney_stats.num_rounds + t_stats.t_rounds_played)) *
          10
      ) / 10, // Update dynamically,
    num_rounds: overall_tourney_stats.num_rounds + t_stats.t_rounds_played,
    average_mov: 0,
    average_score_by_round: [],
    overall_course_stats: overall_tourney_stats.overall_course_stats,
  };

  return {
    updated_player_stats: updated_player_stats,
    tournament_stats: t_stats,
    updated_overall_tourney_stats: updated_overall_tourney_stats,
  };
};
