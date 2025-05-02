import React, { useState, useEffect } from 'react';
import './TournamentResults.scss';

interface Bot {
  id: string;
  name: string;
  wins: number;
  losses: number;
  errors: number;
  games: number;
  winRate: number;
  nonErrorWinRate: number;
  rating: number;
  record: string;
}

type SortField = 'name' | 'id' | 'wins' | 'losses' | 'rating' | 'winRate' | 'nonErrorWinRate';
type SortDirection = 'asc' | 'desc';

export const TournamentResults: React.FC = () => {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('rating');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Determine the path based on environment
        const basePath = process.env.PUBLIC_URL || '';
        // Fetch the CSV file
        const response = await fetch(`${basePath}/tournament_elo_rankings.csv`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch CSV: ${response.statusText}`);
        }
        
        const csvText = await response.text();
        
        // Parse CSV data
        const rows = csvText.split('\n');
        
        // Skip header row (index 0) and parse data rows
        const parsedBots: Bot[] = rows.slice(1)
          .filter(row => row.trim() !== '') // Skip empty rows
          .map(row => {
            const columns = row.split(',');
            
            // Extract data from CSV columns
            const name = columns[0];
            const id = columns[1];
            const wins = parseInt(columns[2], 10);
            const losses = parseInt(columns[3], 10);
            const errors = parseInt(columns[4], 10);
            const games = parseInt(columns[5], 10);
            
            // Parse percentage strings to numbers (remove % sign and convert to number)
            const winRateStr = columns[6];
            const nonErrorWinRateStr = columns[7];
            const winRate = parseFloat(winRateStr.replace('%', ''));
            const nonErrorWinRate = parseFloat(nonErrorWinRateStr.replace('%', ''));
            
            const rating = parseInt(columns[8], 10);
            const record = `${wins}-${losses}-${errors}`;
            
            return {
              id,
              name,
              wins,
              losses,
              errors,
              games,
              winRate,
              nonErrorWinRate,
              rating,
              record
            };
          });
        
        setBots(parsedBots);
        setLoading(false);
      } catch (err) {
        console.error('Error processing tournament results:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };
    
    fetchData();
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
    } else if (sortField === 'nonErrorWinRate') {
      return multiplier * (a.nonErrorWinRate - b.nonErrorWinRate);
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
              <th onClick={() => handleSort('wins')} className="sortable">
                Wins {sortField === 'wins' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('losses')} className="sortable">
                Losses {sortField === 'losses' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('rating')} className="sortable">
                ELO Rating {sortField === 'rating' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedBots.map((bot, index) => (
              <tr key={`${bot.id}-${bot.name}`}>
                <td>{bot.name}</td>
                <td>{bot.id}</td>
                <td>{bot.wins}</td>
                <td>{bot.losses}</td>
                <td>{bot.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}; 