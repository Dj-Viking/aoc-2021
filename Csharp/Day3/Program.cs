namespace Day3
{
    class MainClass
    {
        public string input = "";
        public string[] _lines = new string[] { "" };
        public List<string> mostCommonBits = new List<string>();
        public List<string> leastCommonBits = new List<string>();
        public static void Main(string[] args)
        {
            new MainClass().Run(args);
        }
        public void Run(string[] args)
        {
            this.Init();
            this.GetInput(args[0]);
            this.PartOne();

            this.Init();
            this.GetInput(args[0]);
            this.PartTwo();
        }
        public void Init()
        {
            this.input = "";
            this._lines = new string[] { "" };
            this.mostCommonBits = new List<string>();
            this.leastCommonBits = new List<string>();
        }
        public void GetInput(string fileName)
        {
            this.input = File.ReadAllText(fileName);
            this._lines = input.Split("\n");
        }
        public int CalculateProduct(List<string> mostCommon, List<string> leastCommon)
        {
            int mostBinToInt = Convert.ToInt32(string.Join("", mostCommon), 2);
            int leastBinToInt = Convert.ToInt32(string.Join("", leastCommon), 2);
            return mostBinToInt * leastBinToInt;
        }
        public void PartOne()
        {
            string[] lines = this._lines;
            int ROW_SIZE = lines[0].Length;
            List<string> tempDigits = new List<string>();
            int oneCount = 0;
            int zeroCount = 0;

            for (int c = 0; c < ROW_SIZE; c++)
            {
                tempDigits = new List<string>();
                oneCount = 0;
                zeroCount = 0;

                for (int r = 0; r < lines.Length; r++)
                {
                    //push the digits in the column of the row we are observing here
                    tempDigits.Add(lines[r][c].ToString());
                }

                for (int i = 0; i < tempDigits.Count(); i++)
                {
                    if (tempDigits[i] == "1") oneCount += 1;
                    else zeroCount += 1;
                }

                if (oneCount > zeroCount)
                {
                    this.mostCommonBits.Add("1");
                    this.leastCommonBits.Add("0");
                }
                else
                {
                    this.leastCommonBits.Add("1");
                    this.mostCommonBits.Add("0");
                }

            }

            Console.WriteLine("Part 1: {0}", this.CalculateProduct(this.mostCommonBits, this.leastCommonBits));
        }
        public void PartTwo()
        {
            Console.WriteLine("Part 2: ");
        }
    }
}
