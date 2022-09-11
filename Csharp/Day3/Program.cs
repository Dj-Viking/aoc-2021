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
        private int CalculateProduct(List<string> mostCommon, List<string> leastCommon)
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
                tempDigits.Clear();
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
        public string CalcOxyRating(List<string> list, int col = 0)
        {
            int count = 0;
            List<string> tempList = new List<string>();
            int countFlag = 1;

            for (int i = 0; i < list.Count(); i++)
            {
                if (int.Parse(list[i][col].ToString()) == 1)
                {
                    count++;
                }
            }

            if (count < Math.Floor((double)list.Count()) / 2) countFlag = 0;

            for (int j = 0; j < list.Count(); j++)
            {
                if (int.Parse(list[j][col].ToString()) == countFlag)
                {
                    tempList.Add(list[j]);
                }
            }

            if (tempList.Count() > 1 && col < tempList[0].Length)
                return this.CalcOxyRating(tempList, col + 1);
            else
                return tempList[0];

        }
        public string CalcCo2Rating(List<string> list, int col = 0)
        {
            int zeroCount = 0;
            int oneCount = 0;
            List<string> tempList = new List<string>();

            for (int i = 0; i < list.Count(); i++)
            {
                if (list[i][col].ToString() == "1") oneCount++;
                else zeroCount++;
            }

            for (int j = 0; j < list.Count(); j++)
            {
                if (zeroCount < oneCount && list[j][col].ToString() == "0")
                    tempList.Add(list[j]);
                else if (oneCount < zeroCount && list[j][col].ToString() == "1")
                    tempList.Add(list[j]);
                else if (oneCount == zeroCount && list[j][col].ToString() == "0")
                    tempList.Add(list[j]);
            }

            if (tempList.Count() > 1 && col < tempList[0].Length)
                return this.CalcCo2Rating(tempList, col + 1);
            else
                return tempList[0];
        }
        public void PartTwo()
        {
            string[] linesCopy1 = new string[this._lines.Length];
            Array.Copy(this._lines, linesCopy1, this._lines.Length);

            string oxyRating = this.CalcOxyRating(linesCopy1.ToList());

            string[] linesCopy2 = new string[this._lines.Length];
            Array.Copy(this._lines, linesCopy2, this._lines.Length);

            string co2Rating = this.CalcCo2Rating(linesCopy2.ToList());

            int answer = Convert.ToInt32(oxyRating, 2) * Convert.ToInt32(co2Rating, 2);
            Console.WriteLine("Part 2: {0}", answer);
        }
    }
}
