export const additionalResults = {
  "328964243": { "wins": 12.0, "losses": 22.0, "draws": 0 },
  "329083655": { "wins": 2.0, "losses": 32.0, "draws": 0 },
  "328011679": { "wins": 18.0, "losses": 15.0, "draws": 0 },
  "329635623": { "wins": 19.0, "losses": 15.0, "draws": 0 },
  "328271455": { "wins": 24.0, "losses": 10.0, "draws": 0 },
  "329504922": { "wins": 24.0, "losses": 10.0, "draws": 0 },
  "329841275": { "wins": 26.0, "losses": 6.0, "draws": 0 },
  "3135641": { "wins": 23.0, "losses": 11.0, "draws": 0 },
  "329500132": { "wins": 10.0, "losses": 22.0, "draws": 0 },
  "2259735": { "wins": 25.0, "losses": 9.0, "draws": 0 },
  "329350026": { "wins": 7.0, "losses": 27.0, "draws": 0 },
  "329730440": { "wins": 20.0, "losses": 13.0, "draws": 0 },
  "329747787": { "wins": 25.0, "losses": 9.0, "draws": 0 },
  "329291116": { "wins": 18.0, "losses": 16.0, "draws": 0 },
  "3135635": { "wins": 15.0, "losses": 14.0, "draws": 0 },
  "329817259": { "wins": 5.0, "losses": 25.0, "draws": 0 },
  "3198650": { "wins": 17.0, "losses": 10.0, "draws": 0 },
  "329366470": { "wins": 2.0, "losses": 26.0, "draws": 0 }
};

// Names mapping from the second list
export const agentNames = {
  "328964243": "FinalAgent",
  "329083655": "Final Agent, can pass=False",
  "328011679": "MCTSAgent",
  "329635623": "MCTS ON ROIDS",
  "328271455": "2",
  "329504922": "IterativeDeepening + MCTS Value Net",
  "329841275": "Custom Agent",
  "3135641": "Lamine Yamal",
  "329500132": "meowmeow",
  "2259735": "Silly Goose Agent",
  "329350026": "ExplorerAgent with Smart Rollout",
  "329730440": "Opening book + simple ids",
  "329747787": "MCTS (1)",
  "329291116": "Hybrid(O≤6, occ<0.75, end≤6)",
  "3135635": "MCTS (2)",
  "329817259": "MCTSProMax",
  "3198650": "Funky Time",
  "329366470": "Opening book + transposition table + better rollout MCTS"
};

// ELO ratings
export const eloRatings = {
  "329841275": 1617, // Custom Agent
  "2259735": 1586,   // Silly Goose Agent
  "329747787": 1586, // MCTS (1)
  "328271455": 1574, // 2
  "329504922": 1574, // IterativeDeepening + MCTS Value Net
  "3135641": 1563,   // Lamine Yamal
  "3198650": 1545,   // Funky Time
  "329730440": 1536, // Opening book + simple ids
  "329635623": 1518, // MCTS ON ROIDS
  "328011679": 1514, // MCTSAgent
  "329291116": 1508, // Hybrid(O≤6, occ<0.75, end≤6)
  "3135635": 1503,   // MCTS (2)
  "328964243": 1441, // FinalAgent
  "329500132": 1426, // meowmeow
  "329350026": 1384, // ExplorerAgent with Smart Rollout
  "329817259": 1367, // MCTSProMax
  "329366470": 1326, // Opening book + transposition table + better rollout MCTS
  "329083655": 1320  // Final Agent, can pass=False
}; 