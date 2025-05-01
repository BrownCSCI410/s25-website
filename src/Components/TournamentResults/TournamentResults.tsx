import React, { useState, useEffect } from 'react';
import './TournamentResults.scss';

interface Bot {
  id: string;
  name: string;
  wins: number;
  losses: number;
  games: number;
  rating: number;
  winRate: number;
  record: string;
}

type SortField = 'name' | 'id' | 'wins' | 'losses' | 'rating' | 'winRate';
type SortDirection = 'asc' | 'desc';

export const TournamentResults: React.FC = () => {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('rating');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  useEffect(() => {
    try {
      // Using the imported data directly instead of fetching
      const data = tournamentData;
      
      // Process the data
      const processedBots: Bot[] = Object.entries(data.ratings).map(([id, stats]) => {
        return {
          id,
          name: stats.name || (data.agent_names[id as keyof typeof data.agent_names] || `Unknown Bot ${id}`),
          wins: stats.wins,
          losses: stats.losses,
          games: stats.games,
          rating: Math.round(stats.rating), // Round to integer for display
          winRate: stats.games > 0 ? (stats.wins / stats.games) * 100 : 0,
          record: `${stats.wins}-${stats.losses}-0` // Assuming no draws
        };
      });

      setBots(processedBots);
      setLoading(false);
    } catch (err) {
      console.error('Error processing tournament results:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
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
    } else if (sortField === 'rating') {
      return multiplier * (a.rating - b.rating);
    } else if (sortField === 'winRate') {
      return multiplier * (a.winRate - b.winRate);
    } else {
      return multiplier * (a[sortField] - b[sortField]);
    }
  });

  if (loading) {
    return <div className="tournament-results">Loading tournament results...</div>;
  }

  if (error) {
    return <div className="tournament-results">Error: {error}</div>;
  }

  return (
    <div id="Final Project Results" className="tournament-results">
      <h2>Final Project Tournament Results</h2>
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
              <th onClick={() => handleSort('rating')} className="sortable">
                ELO Rating {sortField === 'rating' && (sortDirection === 'asc' ? '↑' : '↓')}
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
                <td>{bot.rating}</td>
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