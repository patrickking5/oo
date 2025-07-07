import fs from "fs";
import path from "path";
import { updatePlayerStats } from "./updatePlayerStats";

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
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const tournamentData = JSON.parse(fileContents);

    // Separate players into valid and ineligible
    const validPlayers = tournamentData.players.filter(
      (player: any) => !player.scores.includes(-1)
    );
    const ineligiblePlayers = tournamentData.players.filter((player: any) =>
      player.scores.includes(-1)
    );

    // Calculate total scores for valid players
    const playersWithTotalScores = validPlayers.map((player: any) => {
      const totalScore = player.scores.reduce(
        (acc: number, score: number) => acc + score,
        0
      );
      return { ...player, totalScore };
    });

    // Update ineleigible players
    const updatedIneligiblePlayers = ineligiblePlayers.map((player: any) => ({
      ...player, // Spread existing player properties
      rank: "-1", // Add or override rank
      totalScore: -1, // Add or override totalScore
    }));

    // Sort valid players by champion first, then total score
    const sortedPlayers = playersWithTotalScores.sort((a: any, b: any) => {
      if (a.player_full_name === tournamentData.champion_full_name) return -1; // Champion on top
      if (b.player_full_name === tournamentData.champion_full_name) return 1;
      return a.totalScore - b.totalScore; // Sort by total score
    });

    // Function to get ordinal suffix
    const getOrdinalSuffix = (rank: number): string => {
      if (rank % 100 >= 11 && rank % 100 <= 13) return `${rank}th`;
      switch (rank % 10) {
        case 1:
          return `${rank}st`;
        case 2:
          return `${rank}nd`;
        case 3:
          return `${rank}rd`;
        default:
          return `${rank}th`;
      }
    };

    // Check if there’s a tie for 1st place
    const firstPlaceScore = sortedPlayers[0]?.totalScore;
    const tiedForFirst = sortedPlayers.filter(
      (player: any) => player.totalScore === firstPlaceScore
    );

    // If there’s a tie for 1st, assign the champion explicitly
    if (tiedForFirst.length > 1) {
      const champion = sortedPlayers.find(
        (player: any) =>
          player.player_full_name === tournamentData.champion_full_name
      );

      if (champion) {
        // Assign the champion to 1st place
        champion.rank = "1st";

        // Remove the champion from the tie group
        const nonChampionTiedPlayers = tiedForFirst.filter(
          (player: any) => player !== champion
        );

        // Assign remaining tied players to 2nd place
        nonChampionTiedPlayers.forEach((player: any) => {
          player.rank = "2nd";
        });

        // Continue ranking the rest of the players
        let currentRank = 3; // Start from 3rd place
        let previousScore: number | null = null;

        sortedPlayers.forEach((player: any) => {
          if (player.rank) return; // Skip already ranked players

          if (player.totalScore === previousScore) {
            player.rank = `T${currentRank}`;
          } else {
            player.rank = getOrdinalSuffix(currentRank);
            currentRank++;
          }

          previousScore = player.totalScore;
        });
      }
    } else {
      // Default ranking logic if no tie for 1st
      let currentRank = 0;
      let previousScore: number | null = null;
      let tieCount = 0;

      sortedPlayers.forEach((player: any, index: number) => {
        if (player.totalScore === previousScore) {
          // If tied, increment tie count but keep the same rank
          tieCount++;
          player.rank = `T${currentRank}`;
        } else {
          // New rank
          currentRank = index + 1;
          tieCount = 0; // Reset tie count
          player.rank = getOrdinalSuffix(currentRank);
        }
        previousScore = player.totalScore;

        // Update all tied players with the same rank when ties are detected
        if (tieCount > 0) {
          for (let i = index - tieCount; i <= index; i++) {
            sortedPlayers[i].rank = `T${currentRank}`;
          }
        }
      });
    }

    // Update tournament data
    tournamentData.players = sortedPlayers;
    tournamentData.ineligible_players = updatedIneligiblePlayers;

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

  return {
    opens_data: jsonData,
    stats_data: {
      player_stats: player_stats,
      overall_tourney_stats: overall_tourney_stats,
    },
  };
};
