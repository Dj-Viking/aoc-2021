if [ -z "$1" ]
  then
    echo "Please provide a solution file name \nfor example (npm run solve day1)\n .js will be appended"
    exit
fi

echo "solving file $1..."
echo "printing solution..."
echo ""

cd dist;
node "$1.js"

echo ""
echo "done"