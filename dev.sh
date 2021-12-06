echo "first arg after npm start"
echo $1

if [ -d "dist" ]; then
  echo "found dist directory, starting server..."
  npm run concurrent $1
elif ! [ -d "dist" ]; then
  echo "no dist folder detected, compiling typescript, and then starting server"
  npm run tsc;
  npm run concurrent $1
fi