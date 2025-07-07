import { AllPlayersData, PlayerSingleTourneyData } from ".";

export interface TourneyStatsProps {
  Tstats: OverallTourneyStats;
  all_player_stats?: AllPlayersData;
}

export interface OverallTourneyStats {
  num_opens: number;
  num_strokes: number;
  champions: Record<string, string[]>;
  average_score: number;
  unique_players: string[];
  num_rounds: number;
  average_mov: number;
  average_score_by_round: number[];
  overall_course_stats: any;
}

export interface IndividualTournamentData {
  year: string;
  champion_full_name: string;
  number_of_rounds: number;
  dates: string[];
  courses: string[];
  players: PlayerSingleTourneyData[];
  ineligible_players: PlayerSingleTourneyData[];
  stats: Stats;
}

interface Stats {
  t_avg_round_score: number;
  t_avg_total_score: number;
  t_num_full_players_per_round: number[];
  t_num_partial_players_per_round: number[];
  t_num_full_players: number;
  t_num_partial_players: number;
  t_rounds_played: number;
  t_mov: number;
  t_avg_round_scores: number[];
  t_total_round_strokes: number[];
  t_total_strokes: number;
}
