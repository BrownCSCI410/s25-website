/* eslint-disable */
// The above comment disables all ESLint rules for this file
import React, { useState, useEffect } from 'react';
import './TournamentResults.scss';

// Define the structure of our JSON data
interface ResultsData {
  ratings: {
    [id: string]: {
      rating: number;
      games: number;
      wins: number;
      losses: number;
      name: string;
    }
  };
  agent_names: {
    [id: string]: string;
  };
}

interface Bot {
  id: string;
  name: string;
  wins: number;
  losses: number;
  rating: number;
}

type SortField = 'name' | 'id' | 'wins' | 'losses' | 'rating';
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
        // Determine the correct path based on environment
        const basePath = process.env.PUBLIC_URL || '';
        
        // Fetch the JSON file
        const response = await fetch(`${basePath}/results.json`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch results: ${response.statusText}`);
        }
        
        // Parse the JSON data
        const data: ResultsData = await response.json();
        
        // Process the data
        const processedBots: Bot[] = Object.entries(data.ratings).map(([id, stats]) => {
          return {
            id,
            name: stats.name || data.agent_names[id as keyof typeof data.agent_names] || `Unknown Bot ${id}`,
            wins: stats.wins,
            losses: stats.losses,
            rating: Math.round(stats.rating) // Round to integer for display
          };
        });

        setBots(processedBots);
        setLoading(false);
      } catch (err) {
        console.error('Error loading tournament results:', err);
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