set -e

if [ -d "dist" ]; then
  echo "found dist directory, starting server..."
  npm run tsw
elif ! [ -d "dist" ]; then
  echo "no dist folder detected, compiling typescript, and then starting server"
  npm run tsw
fi