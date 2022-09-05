set -e

if [ -z "$1" ]
  then
    echo "✨ Please provide a number as the first argument of this script ✨"
    echo "e.g. (npm run new:day 5)"
    exit 1
fi

DAY="$1"
FOLDER="day$DAY"
FILE="d$DAY"
PART1="p1"
PART2="p2"

echo "creating folder for day $DAY..."
mkdir "$FOLDER"
echo ""
echo "creating solution files..."

cd "$FOLDER"
sh ../boilerPlate.sh "$FILE$PART1.ts"
sh ../boilerPlate.sh "$FILE$PART2.ts"

echo ""
echo "creating input text files..."
touch "sample.txt"
touch "input.txt"
echo ""

echo "done"