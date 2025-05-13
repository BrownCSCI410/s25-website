cd ~/s25_Tournament_Runner/submissions/
python calculate_elo.py
cp tournament_elo_rankings.json ~/s25-website/public/results.json
cd ~/s25-website
git add public/results.json
git commit -m "update"
# git push