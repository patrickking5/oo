export interface PlayerSingleTourneyData {
  player_full_name: string;
  scores: number[]; // Assuming scores is an array of numbers.
  totalScore: number; // Optional as it's not present in ineligible players.
  rank: string; // Optional as it's not present in ineligible players.
}

interface Round {
  score: number;
  course: string;
  date: string;
}

interface PlayerSingleOpenData {
  year: string;
  type: string; // "full" or "partial"
  rounds: Round[];
  rank: string; // rank is a string in your example (e.g., "-1")
  total_score: number;
  average_score: number;
}

interface OpensLog {
  years: string[];
  num: number;
}

interface PlayerCourseData {
  [courseName: string]: {
    // Add properties for the course data if you know what they contain
    rounds: Round[];
    average_score: number;
  };
}

interface SinglePlayerData {
  player_full_name: string;
  player_opens_data: PlayerSingleOpenData[];
  full_opens_log: OpensLog;
  partial_opens_log: OpensLog;
  course_data: PlayerCourseData;
  average_score: number;
  num_rounds: number;
  eligible_score_history: number[];
  podium_finishes: number;
  runner_ups: number;
  third_place_finishes: number;
  wins: number;
  total_strokes: number;
  total_opens_num: number;
}

export interface AllPlayersData {
  [playerName: string]: SinglePlayerData;
}
