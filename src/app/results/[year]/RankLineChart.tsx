import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { useState } from "react";
import { Button } from "@mui/material";

interface Player {
  player_full_name: string;
  scores: number[];
  rank: string;
  totalScore: number;
}

interface Props {
  data: {
    players: Player[];
    number_of_rounds: number;
  };
}

function calculateStandings(players: Player[], rounds: number) {
  const standings = [];

  // First data point with everyone tied at rank 1
  const initialStanding: any = { round: "Start" };
  players.forEach((player) => {
    initialStanding[player.player_full_name] = 1;
  });
  standings.push(initialStanding);

  for (let r = 1; r <= rounds; r++) {
    const roundScores = players.map((player) => ({
      name: player.player_full_name,
      score: player.scores.slice(0, r).reduce((a, b) => a + b, 0),
    }));

    // Sort players by score
    roundScores.sort((a, b) => a.score - b.score);

    let rank = 1;
    const roundStanding: Record<string, number | string> = {
      round: `After R${r}`,
    };

    for (let i = 0; i < roundScores.length; i++) {
      const player = roundScores[i];
      roundStanding[player.name] = rank;

      // If the next player has a different score, increment rank
      if (
        i < roundScores.length - 1 &&
        player.score !== roundScores[i + 1].score
      ) {
        rank = i + 2;
      }
    }

    standings.push(roundStanding);
  }

  return standings;
}

export default function RankLineChart({ data }: Props) {
  const [showAll, setShowAll] = useState(false);

  const allStandings = calculateStandings(data.players, data.number_of_rounds);
  const topPlayers = showAll ? data.players : data.players.slice(0, 5);
  const eligiblePlayersCount = data.players.length;

  return (
    <div>
      <Button onClick={() => setShowAll(!showAll)}>
        {showAll ? "Show Top 5" : "Show All"}
      </Button>

      <ResponsiveContainer width="70%" height={400}>
        <LineChart data={allStandings}>
          <XAxis dataKey="round" />
          <YAxis
            reversed={true}
            domain={[1, eligiblePlayersCount]}
            tickCount={eligiblePlayersCount}
            interval={0}
          />
          <Tooltip />
          <Legend />
          {topPlayers.map((player) => (
            <Line
              key={player.player_full_name}
              type="linear" // Change this to "linear" for a straight line
              dataKey={player.player_full_name}
              stroke={`hsl(${Math.random() * 360}, 70%, 50%)`}
              strokeWidth={2}
            />
          ))}
          {/* Custom Label List to show player info next to the last data point */}
          {topPlayers.map((player) => {
            // Get the last data point for each player
            const lastDataPoint = allStandings[allStandings.length - 1];
            const playerRank = lastDataPoint[player.player_full_name];
            const playerTotalScore = player.totalScore;

            return (
              <LabelList
                key={player.player_full_name}
                dataKey={player.player_full_name}
                position="insideRight"
                content={({ x, y, index }) => (
                  <text
                    x={x} // Position slightly to the right of the data point
                    y={y} // Align with the y-position of the last data point
                    fill="black"
                    fontSize={12}
                    textAnchor="start"
                    //   verticalAnchor="middle"
                  >
                    {`${player.player_full_name}: ${playerRank} - ${playerTotalScore} points`}
                  </text>
                )}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
