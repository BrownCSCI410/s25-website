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
        
        // Initialize bot stats
        Object.entries(data.bots).forEach(([id, name]) => {
          botStats[id] = {
            id,
            name: name as string,
            wins: 0,
            losses: 0,
            elo: data.final_ratings[id]
          };
        });

        // Calculate wins and losses
        data.results.forEach((result: TournamentResult) => {
          const blackBot = Object.entries(data.bots).find(([_, name]) => name === result.black)?.[0];
          const whiteBot = Object.entries(data.bots).find(([_, name]) => name === result.white)?.[0];

          if (blackBot && whiteBot) {
            // Parse the score string from format "(x.0, y.0)" to numbers
            const [blackScore, whiteScore] = result.score
              .replace('(', '')
              .replace(')', '')
              .split(',')
              .map(s => parseFloat(s.trim()));
            
            if (blackScore === 0 && whiteScore === 0) {
              // If score is (0.0, 0.0), both bots won one game
              botStats[blackBot].wins++;
              botStats[whiteBot].wins++;
            } else {
              // For (2.0, -2.0) or (-2.0, 2.0) scores, only one bot won both games
              if (blackScore > whiteScore) {
                botStats[blackBot].wins++;
                botStats[whiteBot].losses++;
              } else if (whiteScore > blackScore) {
                botStats[whiteBot].wins++;
                botStats[blackBot].losses++;
              }
            }
          }
        });

        console.log('Processed bot stats:', botStats); // Debug log
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