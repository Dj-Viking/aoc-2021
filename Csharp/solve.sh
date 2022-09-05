set -e

if [ -z "$1" ]
  then
    echo "Please provide a solution directory day number as first argument"
    echo ""
    echo "for example:  sh solve.sh (1)"
    echo ""
    exit 1
fi

DAYDIR="day$1"

echo "solving file in folder $DAYDIR..."

cd "$DAYDIR"

echo "printing solution..."
echo ""
dotnet run;
echo ""
echo "done"