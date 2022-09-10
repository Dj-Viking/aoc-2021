namespace Day2
{
    class MainClass
    {
        public string input = "";
        public string[] _lines = new string[] { "" };
        public int hPos = 0;
        public int vPos = 0;
        public int tempNum = 0;
        public int aim = 0;
        public int forward = 0;
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
            this.hPos = 0;
            this.vPos = 0;
            this.tempNum = 0;
            this.aim = 0;
            this.forward = 0;
        }
        private static string GetWord(int index, string[] array)
        {
            return array[index].Split(" ")[0];
        }
        private static int GetNumber(int index, string[] array)
        {
            return int.Parse(array[index].Split(" ")[1]);
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
            string[] lines = this._lines;
            for (int i = 0; i < lines.Length; i++)
            {
                this.tempNum = GetNumber(i, lines);
                this.forward = 0;
                switch (GetWord(i, lines))
                {
                    case "forward":
                        {
                            this.forward = this.tempNum;
                            this.hPos += this.tempNum;
                            if (this.aim == 0)
                                continue;
                            if (this.aim > 0)
                                this.vPos += this.forward * this.aim;
                        }
                        break;
                    case "up":
                        {
                            this.aim -= this.tempNum;
                        }
                        break;
                    case "down":
                        {
                            this.aim += this.tempNum;
                        }
                        break;
                }
            }
            Console.WriteLine("Part 2: {0}", (this.hPos * this.vPos));
        }
    }
}
