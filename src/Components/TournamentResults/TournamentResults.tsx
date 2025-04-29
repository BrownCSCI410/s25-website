import React, { useEffect, useState } from 'react';
import './TournamentResults.scss';

interface TournamentResult {
  black: string;
  white: string;
  winner: string;
  score: string;
  duration: number;
  move_counts: number;
  timestamp: string;
  board_size: number;
}

interface Bot {
  id: string;
  name: string;
  wins: number;
  losses: number;
  elo: number;
}

type SortField = 'name' | 'id' | 'wins' | 'losses' | 'elo';
type SortDirection = 'asc' | 'desc';

export const TournamentResults: React.FC = () => {
  const [bots, setBots] = useState<Bot[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>('elo');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  useEffect(() => {
    // Use the correct path for GitHub Pages
    fetch('/s25-website/results.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Loaded data:', data); // Debug log
        
        // Calculate wins and losses for each bot
        const botStats: { [key: string]: Bot } = {};
        
        // Create lookup maps for bots by ID and by name
        const botIdByName: { [key: string]: string } = {};
        
        // Initialize bot stats
        Object.entries(data.bots).forEach(([id, name]) => {
          const botName = String(name);
          botStats[id] = {
            id,
            name: botName,
            wins: 0,
            losses: 0,
            elo: data.final_ratings[id]
          };
          
          // Create a map from bot name to bot ID for easy lookup
          botIdByName[botName] = id;
        });
        
        console.log("Bot ID by Name lookup:", botIdByName);

        // Calculate wins and losses
        data.results.forEach((result: TournamentResult, index: number) => {
          console.log(`Match ${index}: ${result.black} vs ${result.white}`);
          
          // Get bot IDs using the name lookup
          const blackBotId = botIdByName[result.black];
          const whiteBotId = botIdByName[result.white];
          
          console.log(`Looking up IDs - Black: ${blackBotId}, White: ${whiteBotId}`);
          
          if (!blackBotId || !whiteBotId) {
            console.log("Could not find both bots, skipping");
            return;
          }
          
          // Parse score from the score string: "(x.0, y.0)"
          const scoreMatch = result.score.match(/\((-?\d+\.\d+),\s*(-?\d+\.\d+)\)/);
          if (!scoreMatch) {
            console.log(`Could not parse score: ${result.score}`);
            return;
          }
          
          const blackScore = parseFloat(scoreMatch[1]);
          const whiteScore = parseFloat(scoreMatch[2]);
          
          // Update the win/loss counts based on score
          if (blackScore === 0 && whiteScore === 0) {
            // Draw means both bots won one game each
            botStats[blackBotId].wins += 1;
            botStats[whiteBotId].wins += 1;
          } else if (blackScore > whiteScore) {
            // Black won
            botStats[blackBotId].wins += 1;
            botStats[whiteBotId].losses += 1;
          } else if (whiteScore > blackScore) {
            // White won
            botStats[whiteBotId].wins += 1;
            botStats[blackBotId].losses += 1;
          }
        });

        console.log("Final bot stats:", botStats);
        setBots(Object.values(botStats));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading tournament results:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedBots = [...bots].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    if (sortField === 'name') {
      return multiplier * a.name.localeCompare(b.name);
    } else if (sortField === 'id') {
      return multiplier * a.id.localeCompare(b.id);
    } else {
      const aValue = a[sortField as keyof Omit<Bot, 'name' | 'id'>];
      const bValue = b[sortField as keyof Omit<Bot, 'name' | 'id'>];
      return multiplier * (aValue - bValue);
    }
  });

  if (loading) {
    return <div className="tournament-results">Loading tournament results...</div>;
  }

  if (error) {
    return <div className="tournament-results">Error loading tournament results: {error}</div>;
  }

  return (
    <div id="Final Project Results" className="tournament-results">
      <h2>Final Project Tournament</h2>
      {bots.length === 0 ? (
        <p>No tournament results available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')} className="sortable">
                Agent Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('id')} className="sortable">
                Submission ID {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('wins')} className="sortable">
                Wins {sortField === 'wins' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('losses')} className="sortable">
                Losses {sortField === 'losses' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('elo')} className="sortable">
                Elo Rating {sortField === 'elo' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedBots.map(bot => (
              <tr key={`${bot.id}-${bot.name}`}>
                <td>{bot.name}</td>
                <td>{bot.id}</td>
                <td>{bot.wins}</td>
                <td>{bot.losses}</td>
                <td>{bot.elo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}; 