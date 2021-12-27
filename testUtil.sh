if [ -z "$1" ]
  then
    echo "Please provide a solution directory day number as first argument"
    echo ""
    echo "for example:  (npm run solve (1) 2)"
    echo ""
    exit
fi

DIR="utils"
FILE="$1"

echo "running file $FILE.js..."
echo "with command (node ./$DIR/$FILE.js) from dist directory"
echo ""

cd dist;
node "./$DIR/$FILE.js"

echo ""
echo "done"