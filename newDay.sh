if [ -z "$1" ]
  then
    echo "✨ Please provide a number as the first argument of this script ✨"
    echo "e.g. (npm run new:day 5)"
    exit
fi

DAY="$1"
FOLDER="day$DAY"
FILE1="d$DAY"
PART1="p1"
PART2="p2"
EXT=".ts"

echo "creating folder for day $DAY..."
mkdir "$FOLDER";
echo ""
echo "creating solution files..."
touch "$FOLDER/$FILE1$PART1$EXT"
touch "$FOLDER/$FILE1$PART2$EXT"
echo ""
echo "creating input text files"
touch "$FOLDER/sample.txt"
touch "$FOLDER/input.txt"