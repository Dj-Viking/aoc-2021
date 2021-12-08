if [ -z "$1" ]
  then
    echo "Please provide a solution directory day number as first argument"
    echo ""
    echo "for example (npm run solve (1) 2)"
    echo ""
    exit
fi

if [ -z "$2" ]
  then
    echo "Please provide a part number to solve as the second argument"
    echo ""
    echo "e.g. (npm run solve 4 (1)) or (npm run solve 4 (2))"
    echo ""
    exit
fi

DAYDIR="day$1"
PART="p$2"
FILE="d$1$PART"

echo "solving file $1.js..."
echo "printing solution..."
echo ""

cd dist;
node "./$DAYDIR/$FILE.js"

echo ""
echo "done"