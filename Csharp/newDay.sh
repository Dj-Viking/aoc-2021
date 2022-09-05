set -e

if [ -z "$1" ]
  then
    echo "✨ Please provide a number as the first argument of this script ✨";
    echo "e.g. sh newDay.sh 5";
    exit 1;
fi

DAY="$1"
FOLDER="Day$DAY"

echo "creating folder for day $DAY..."
mkdir "$FOLDER";
echo ""
echo "creating dotnet console project for new day"
cd $FOLDER
dotnet new console;

rm Program.cs;

echo ""
echo "creating input text files..."
touch "sample.txt"
touch "input.txt"
echo ""
echo "done"

cat << EOF > Program.cs
namespace $FOLDER
{
    class MainClass
    {
        public string input = "";
        public string[] _lines = new string[] { "" };
        public static void Main(string[] args)
        {
            new MainClass().Run(args);
        }   
        public void Run(string[] args)
        {
            this.GetInput(args[0]);
            this.PartOne();
            this.PartTwo();
        }
        public void GetInput(string fileName)
        {
            this.input = File.ReadAllText(fileName);
            this._lines = input.Split("\n");
        }
        public void PartOne()
        {
            Console.WriteLine("Part 1: ");
        }
        public void PartTwo()
        {
            Console.WriteLine("Part 2: ");
        }
    }
}