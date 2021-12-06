if [ -d "dist" ]; then
  echo "found dist directory, starting server..."
  npm run concurrent
elif ! [ -d "dist" ]; then
  echo "no dist folder detected, compiling typescript, and then starting server"
  npm run tsc;
  npm run concurrent
fi