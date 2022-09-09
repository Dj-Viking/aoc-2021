namespace Day2
{
    class MainClass
    {
        public string input = "";
        public string[] _lines = new string[] { "" };
        public int hPos = 0;
        public int vPos = 0;
        public int tempNum = 0;
        public string word = "";
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
        private static string GetWord(int index, string[] array)
        {
            string str = "";
            str = array[index].Split(" ")[0];
            return str;
        }
        private static int GetNumber(int index, string[] array)
        {
            int num = 0;
            num = int.Parse(array[index].Split(" ")[1]);
            return num;
        }
        public void GetInput(string fileName)
        {
            this.input = File.ReadAllText(fileName);
            this._lines = input.Split("\n");
        }
        public void PartOne()
        {
            string[] lines = this._lines;
            for (int i = 0; i < lines.Length; i++)
            {
                this.tempNum = GetNumber(i, lines);
                switch (GetWord(i, lines))
                {
                    case "forward":
                        {
                            this.hPos += tempNum;
                        }
                        break;
                    case "up":
                        {
                            this.vPos -= tempNum;
                        }
                        break;
                    case "down":
                        {
                            this.vPos += tempNum;
                        }
                        break;
                }
            }
            Console.WriteLine("Part 1: {0}", (this.hPos * this.vPos));
        }
        public void PartTwo()
        {
            Console.WriteLine("Part 2: ");
        }
    }
}
