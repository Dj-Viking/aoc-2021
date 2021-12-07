if [ -z "$1" ]
  then
    echo "Please provide a solution directory/file path \nfor example (npm run solve day1/d1p1)\n.js extension will be appended"
    exit
fi

echo "solving file $1.js..."
echo "printing solution..."
echo ""

cd dist;
node "./$1.js"

echo ""
echo "done"