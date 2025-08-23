import fs from "fs";
import path from "path";
import { loadSingleOpen } from "./loadSingleOpen";
import { updatePlayerStats } from "./updatePlayerStats";

const csvEscape = (value: string | number | null | undefined) => {
  if (value === null || value === undefined) return "";
  const s = String(value);
  // Wrap in quotes if it contains quotes, comma, or newline; escape " as ""
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
};

export const loadOpensData = () => {
  const dataDir = path.join(process.cwd(), "data");
  const fileNames = fs.readdirSync(`${dataDir}/raw_opens`);
  const legaciesFilePath = path.join(dataDir, "legacies.json");
  var player_stats = JSON.parse(fs.readFileSync(legaciesFilePath, "utf-8"));
  var overall_tourney_stats = {
    num_opens: 0,
    num_strokes: 0,
    champions: {},
    average_score: 0,
    unique_players: [""],
    num_rounds: 0,
    average_mov: 0,
    average_score_by_round: [],
    overall_course_stats: {},
  };

  const jsonData = fileNames.map((fileName) => {
    const filePath = path.join(`${dataDir}/raw_opens`, fileName);
    const tournamentData = loadSingleOpen(filePath);
    // const fileContents = fs.readFileSync(filePath, "utf-8");
    // const tournamentData = JSON.parse(fileContents);

    const updated_stats = updatePlayerStats(
      player_stats,
      overall_tourney_stats,
      tournamentData
    );
    player_stats = updated_stats.updated_player_stats;
    overall_tourney_stats = updated_stats.updated_overall_tourney_stats;
    tournamentData.stats = updated_stats.tournament_stats;

    return tournamentData;
  });

  overall_tourney_stats.unique_players = Object.keys(player_stats);

  const live_open_data = loadSingleOpen(`${dataDir}/liveopen.json`);
  // 👉 Write CSV: player_name,wins,average_score
  const rows: string[] = [];
  rows.push(["player_name", "wins", "average_score"].join(","));

  // If you want to sort, you can adjust this array before writing.
  for (const playerName of Object.keys(player_stats)) {
    const p = player_stats[playerName] || {};
    const wins = p.wins ?? 0;
    const avg = p.average_score ?? "";
    rows.push(
      [csvEscape(playerName), csvEscape(wins), csvEscape(avg)].join(",")
    );
  }

  // 👇 Write stats to file
  const outputFilePath = path.join(dataDir, "stats_output.json");
  // fs.writeFileSync(
  //   outputFilePath,
  //   JSON.stringify(
  //     {
  //       player_stats,
  //     },
  //     null,
  //     2 // pretty print with indentation
  //   ),
  //   "utf-8"
  // );

  const csvOutputPath = path.join(dataDir, "player_summary.csv");
  // fs.writeFileSync(csvOutputPath, rows.join("\n"), "utf-8");
  return {
    opens_data: jsonData,
    live_open_data: live_open_data,
    stats_data: {
      player_stats: player_stats,
      overall_tourney_stats: overall_tourney_stats,
    },
  };
};
