using System.IO;
namespace Day1
{
    class MainClass
    {
        public string input = "";
        public string[] _lines = new string[] { "" };
        public int partOneMeasurements = 0;
        public int partTwoMeasurements = 0;
        public List<int> currentWindowList = new List<int>();
        public List<int> previousWindowList = new List<int>();
        public int currentSum = 0;
        public int previousSum = 0;

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
        public static bool IsInBounds(int index, string[] array)
        {
            return (index >= 0) && (index < array.Length);
        }
        public void AddToList(int index, string[] array, bool isCurrent)
        {
            // only add to the list if the index was in bounds with the array
            int windowPiece = 0;
            if (int.TryParse(array[index], out windowPiece))
            {
                windowPiece = int.Parse(array[index]);
                if (isCurrent)
                {
                    this.currentWindowList.Add(windowPiece);
                }
                else
                {
                    this.previousWindowList.Add(windowPiece);
                }
            }
        }
        public int CalculateSum(bool isCurrent)
        {
            int sum = 0;
            if (isCurrent)
            {
                for (int i = 0; i < this.currentWindowList.Count(); i++)
                {
                    sum += this.currentWindowList[i];
                }
            }
            else
            {
                for (int i = 0; i < this.previousWindowList.Count(); i++)
                {
                    sum += this.previousWindowList[i];
                }
            }
            return sum;
        }
        public void PartOne()
        {
            string[] lines = this._lines;
            for (int i = 1; i < lines.Length; i++)
            {
                int current = int.Parse(lines[i]);
                int previous = int.Parse(lines[i - 1]);
                if (current > previous)
                {
                    this.partOneMeasurements += 1;
                }
            }
            Console.WriteLine("Part 1: {0}", this.partOneMeasurements);
        }
        public void PartTwo()
        {
            string[] lines = this._lines;
            for (int i = 0; i < lines.Length; i++)
            {
                this.currentSum = 0;
                this.currentWindowList.Clear();

                this.previousSum = 0;
                this.previousWindowList.Clear();

                int currentWindowStartIndex = i + 1;
                int currentWindowMiddleIndex = i + 2;
                int currentWindowEndIndex = i + 3;

                int previousWindowStartIndex = i;
                int previousWindowMiddleIndex = i + 1;
                int previousWindowEndIndex = i + 2;

                // add to currentWindowList
                if (IsInBounds(currentWindowStartIndex, lines)) this.AddToList(currentWindowStartIndex, lines, true);
                if (IsInBounds(currentWindowMiddleIndex, lines)) this.AddToList(currentWindowMiddleIndex, lines, true);
                if (IsInBounds(currentWindowEndIndex, lines)) this.AddToList(currentWindowEndIndex, lines, true);
                //
                // add to previousWindowList
                //
                if (IsInBounds(previousWindowStartIndex, lines)) this.AddToList(previousWindowStartIndex, lines, false);
                if (IsInBounds(previousWindowMiddleIndex, lines)) this.AddToList(previousWindowMiddleIndex, lines, false);
                if (IsInBounds(previousWindowEndIndex, lines)) this.AddToList(previousWindowEndIndex, lines, false);
                // sum up currentWindowList
                currentSum = this.CalculateSum(true);
                // sum up previousWindowList
                previousSum = this.CalculateSum(false);

                // is current - previous greater than 0? increase partTwoMeasurement count
                if (currentSum - previousSum > 0)
                {
                    this.partTwoMeasurements++;
                }
                // don't loop again if we've reached the end of all available lines on the current window 
                if (currentWindowList.Count() == 3 && i == lines.Length - 1)
                {
                    break;
                }
            }
            Console.WriteLine("Part 2: {0}", this.partTwoMeasurements);
        }
    }
}
