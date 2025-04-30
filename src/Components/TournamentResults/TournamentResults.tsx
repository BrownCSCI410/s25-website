import React, { useState, useEffect } from 'react';
import './TournamentResults.scss';
import { additionalResults, agentNames, eloRatings } from './results';

interface Bot {
  id: string;
  name: string;
  wins: number;
  losses: number;
  draws: number;
  elo: number;
  winRate: number;
  record: string;
}

type SortField = 'name' | 'id' | 'wins' | 'losses' | 'elo' | 'winRate';
type SortDirection = 'asc' | 'desc';

export const TournamentResults: React.FC = () => {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>('elo');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  useEffect(() => {
    // Process the data from our local files
    const processedBots: Bot[] = Object.entries(additionalResults).map(([id, data]) => {
      const wins = data.wins;
      const losses = data.losses;
      const draws = data.draws;
      const totalGames = wins + losses + draws;
      
      return {
        id,
        name: agentNames[id as keyof typeof agentNames] || `Unknown Bot ${id}`,
        wins,
        losses,
        draws,
        elo: eloRatings[id as keyof typeof eloRatings] || 0,
        winRate: totalGames > 0 ? (wins / totalGames) * 100 : 0,
        record: `${wins}-${losses}-${draws}`
      };
    });

    setBots(processedBots);
    setLoading(false);
  }, []);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedBots = [...bots].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    if (sortField === 'name') {
      return multiplier * a.name.localeCompare(b.name);
    } else if (sortField === 'id') {
      return multiplier * a.id.localeCompare(b.id);
    } else if (sortField === 'elo') {
      return multiplier * (a.elo - b.elo);
    } else if (sortField === 'winRate') {
      return multiplier * (a.winRate - b.winRate);
    } else {
      return multiplier * (a[sortField] - b[sortField]);
    }
  });

  if (loading) {
    return <div className="tournament-results">Loading tournament results...</div>;
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
                ID {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('elo')} className="sortable">
                ELO Rating {sortField === 'elo' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('wins')} className="sortable">
                W-L-D {sortField === 'wins' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('winRate')} className="sortable">
                Win Rate {sortField === 'winRate' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedBots.map((bot, index) => (
              <tr key={`${bot.id}-${bot.name}`}>
                <td>{bot.name}</td>
                <td>{bot.id}</td>
                <td>{bot.elo}</td>
                <td>{bot.record}</td>
                <td>{bot.winRate.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}; 