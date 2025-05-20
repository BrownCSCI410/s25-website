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

interface MatchData {
  [agentId: string]: {
    [opponentId: string]: number | null;
  };
}

export const TournamentResults: React.FC = () => {
  const [bots, setBots] = useState<Bot[]>([]);
  const [top32Bots, setTop32Bots] = useState<Bot[]>([]);
  const [matchData, setMatchData] = useState<MatchData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('rating');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [top32SortField, setTop32SortField] = useState<SortField>('rating');
  const [top32SortDirection, setTop32SortDirection] = useState<SortDirection>('desc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const basePath = process.env.PUBLIC_URL || '';
        
        // Fetch all data files
        const [mainResponse, top32Response, matchesResponse] = await Promise.all([
          fetch(`${basePath}/results.json`),
          fetch(`${basePath}/top32_results.json`),
          fetch(`${basePath}/top32_matches.csv`)
        ]);
        
        if (!mainResponse.ok || !top32Response.ok || !matchesResponse.ok) {
          throw new Error('Failed to fetch tournament data');
        }
        
        // Parse JSON files
        const [mainData, top32Data]: [ResultsData, ResultsData] = await Promise.all([
          mainResponse.json(),
          top32Response.json()
        ]);

        // Parse CSV data
        const csvText = await matchesResponse.text();
        const rows = csvText.split('\n').map(row => row.split(','));
        const headers = rows[0].slice(1); // Skip first empty cell
        const matchData: MatchData = {};
        
        // Process match data
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          const agentId = row[0];
          if (!agentId) continue;
          
          matchData[agentId] = {};
          for (let j = 1; j < row.length; j++) {
            const score = row[j];
            if (score === '' || score === 'ERROR') {
              matchData[agentId][headers[j-1]] = null;
            } else {
              matchData[agentId][headers[j-1]] = parseFloat(score);
            }
          }
        }
        
        // Process bot data
        const processedBots: Bot[] = Object.entries(mainData.ratings).map(([id, stats]) => ({
          id,
          name: stats.name || mainData.agent_names[id as keyof typeof mainData.agent_names] || `Unknown Bot ${id}`,
          wins: stats.wins,
          losses: stats.losses,
          rating: Math.round(stats.rating)
        }));

        const processedTop32Bots: Bot[] = Object.entries(top32Data.ratings).map(([id, stats]) => ({
          id,
          name: stats.name || top32Data.agent_names[id as keyof typeof top32Data.agent_names] || `Unknown Bot ${id}`,
          wins: stats.wins,
          losses: stats.losses,
          rating: Math.round(stats.rating)
        }));

        setBots(processedBots);
        setTop32Bots(processedTop32Bots);
        setMatchData(matchData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading tournament data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleSort = (field: SortField, isTop32: boolean = false) => {
    if (isTop32) {
      if (field === top32SortField) {
        setTop32SortDirection(top32SortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setTop32SortField(field);
        setTop32SortDirection('desc');
      }
    } else {
      if (field === sortField) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortField(field);
        setSortDirection('desc');
      }
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

  const sortedTop32Bots = [...top32Bots].sort((a, b) => {
    const multiplier = top32SortDirection === 'asc' ? 1 : -1;
    if (top32SortField === 'name') {
      return multiplier * a.name.localeCompare(b.name);
    } else if (top32SortField === 'id') {
      return multiplier * a.id.localeCompare(b.id);
    } else {
      return multiplier * (a[top32SortField] - b[top32SortField]);
    }
  });

  const getScoreColor = (score: number | null | string | undefined): string => {
    if (score === null || score === 'ERROR' || score === undefined) return '#666'; // Gray for no match/error
    if (score === 0) return '#808080'; // Darker gray for draws
    const maxScore = 10; // Maximum score difference for color scaling
    const normalizedScore = Math.max(-maxScore, Math.min(maxScore, score as number)) / maxScore;
    if (normalizedScore > 0) {
      // Green for wins, intensity based on score
      const intensity = Math.abs(normalizedScore);
      return `rgba(76, ${Math.round(175 + (80 * (1 - intensity)))}, 80, ${0.5 + (0.5 * intensity)})`;
    } else {
      // Red for losses, intensity based on score
      const intensity = Math.abs(normalizedScore);
      return `rgba(244, ${Math.round(67 + (188 * (1 - intensity)))}, 54, ${0.5 + (0.5 * intensity)})`;
    }
  };

  const renderHeatmap = () => {
    // Get top 32 bots by rating
    const topBots = [...top32Bots]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 32);

    // Create a map of bot IDs to names for easy lookup
    const botNameMap = new Map(topBots.map(bot => [bot.id, bot.name]));

    // Create a map of bot IDs to their match results
    const matchResults = new Map<string, Map<string, number | string | null>>(
      topBots.map(bot => [
        bot.id,
        new Map<string, number | string | null>(
          topBots.map(opponent => {
            const botMatches = matchData[bot.id];
            if (!botMatches) return [opponent.id, null];
            
            const score = botMatches[opponent.id];
            if (score === null) return [opponent.id, null];
            if (typeof score === 'string') return [opponent.id, 'ERROR'];
            return [opponent.id, -score];
          })
        )
      ])
    );

    return (
      <div className="heatmap-container">
        <h3>Match Results Heatmap (Top 32 Agents, 10 games between each pair of agents)</h3>
        <div className="heatmap">
          <table>
            <thead>
              <tr>
                <th></th>
                {topBots.map(bot => (
                  <th key={bot.id} title={`ID: ${bot.id}`}>
                    <span>{bot?.name || 'Unknown'}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topBots.map(bot => (
                <tr key={bot.id}>
                  <th title={`ID: ${bot.id}`}>{bot?.name || 'Unknown'}</th>
                  {topBots.map(opponent => {
                    const score = matchResults.get(bot.id)?.get(opponent.id);
                    const cellColor = getScoreColor(score);

                    return (
                      <td
                        key={opponent.id}
                        style={{ backgroundColor: cellColor }}
                        title={`${bot?.name || 'Unknown'} vs ${opponent?.name || 'Unknown'}: ${
                          score === null ? 'No match' :
                          score === 'ERROR' ? 'Error' :
                          score === 0 ? 'Draw' :
                          typeof score === 'number' ? 
                            `${score > 0 ? 'Win' : 'Loss'} by ${Math.abs(score)}` :
                          'Unknown'
                        }`}
                      />
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="heatmap-legend">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: 'rgba(76, 175, 80, 1)' }}></div>
            <span>Strong Win</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: 'rgba(244, 67, 54, 1)' }}></div>
            <span>Strong Loss</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#808080' }}></div>
            <span>Draw</span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="tournament-results">Loading tournament results...</div>;
  }

  if (error) {
    return <div className="tournament-results">Error: {error}</div>;
  }

  const renderTable = (bots: Bot[], isTop32: boolean = false) => {
    const currentSortField = isTop32 ? top32SortField : sortField;
    const currentSortDirection = isTop32 ? top32SortDirection : sortDirection;
    const handleTableSort = (field: SortField) => handleSort(field, isTop32);

    return (
      <table>
        <thead>
          <tr>
            <th className="rank-column">#</th>
            <th onClick={() => handleTableSort('name')} className="sortable">
              Agent Name {currentSortField === 'name' && (currentSortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleTableSort('id')} className="sortable">
              ID {currentSortField === 'id' && (currentSortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleTableSort('wins')} className="sortable">
              Win Percentage {currentSortField === 'wins' && (currentSortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleTableSort('rating')} className="sortable">
              ELO Rating {currentSortField === 'rating' && (currentSortDirection === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {bots.filter(bot => bot.id !== '3199411').map((bot, index) => (
            <tr key={`${bot.id}-${bot.name}`}>
              <td>{index + 1}</td>
              <td>{bot.name}</td>
              <td>{bot.id}</td>
              <td>{(bot.wins / (bot.wins + bot.losses)).toFixed(2)}</td>
              <td>{bot.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div id="Final Project Results" className="tournament-results">
      <h2 style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Final Tournament Results!</h2>
      <div className="tournament-section">
        <h3>Full Tournament Results</h3>
        {bots.length === 0 ? (
          <p>No tournament results available.</p>
        ) : (
          renderTable(sortedBots)
        )}
      </div>
      <div className="tournament-section">
        <h3>Top 32 Results (10 games between each pair of agents)</h3>
        {top32Bots.length === 0 ? (
          <p>No top 32 results available.</p>
        ) : (
          renderTable(sortedTop32Bots, true)
        )}
      </div>
      {renderHeatmap()}
    </div>
  );
}