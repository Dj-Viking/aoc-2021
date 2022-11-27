namespace Day14
{
    class MainClass
    {
        public string input = "";
        public string[] _lines = new string[] { "" };
        public string _template = "";
        public string _tempTemplate = "";
        public int[][] _observedPairs = new int[][] { new int[] { 0 } };
        int TABLE_CAP = ('Z' - 'A') + 1;
        public Dictionary<string, string> _insertionRules = new();
        public Dictionary<string, string> _wasInserted = new();
        // int _steps = 3;

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
            this._template = "";
            this._observedPairs = new int[][] { new int[] { 0 } };
            this._insertionRules = new Dictionary<string, string>();
            this._wasInserted = new Dictionary<string, string>();
        }
        public void GetInput(string fileName)
        {
            this.input = File.ReadAllText(fileName);
            this._lines = input.Split(Environment.NewLine);
        }
        private void ParsePolymerTemplate()
        {
            this._template = this._lines[0];
        }
        private void ParseInsertionRules()
        {
            for (int i = 2; i < this._lines.Length; i++)
            {
                string rule = this._lines[i].Split(" -> ")[0];
                string insertion = this._lines[i].Split(" -> ")[1];
                this._insertionRules.TryAdd(rule, insertion);
            }
        }
        private void DumpGraph(int[][] graph)
        {
            int i, j = 0;

            List<string> alphabetLine = new();
            for (i = 0; i < this.TABLE_CAP; i++)
            {
                alphabetLine.Add(((char)(i + 'A')).ToString());
            }
            Console.Write("  ");
            Console.WriteLine("{0} ", string.Join(" ", alphabetLine));
            for (i = 0; i < this.TABLE_CAP; i++)
            {
                Console.Write("{0} ", (char)(i + 'A'));
                for (j = 0; j < this.TABLE_CAP; j++)
                {
                    if (this._observedPairs[i][j] != 0)
                        Console.Write("{0} ", this._observedPairs[i][j]);
                    else
                        Console.Write(". ");
                }
                Console.Write(Environment.NewLine);
            }
        }
        private void ParseCurrentPairsOnStep()
        {
            this._observedPairs = new int[][] { new int[] { 0 } };

            List<List<int>> lists = new List<List<int>>();

            for (int i = 0; i < this.TABLE_CAP; i++)
            {
                List<int> tempList = new List<int>();
                for (int j = 0; j < this.TABLE_CAP; j++)
                {
                    tempList.Add(0);
                }
                lists.Add(tempList);
            }

            this._observedPairs = lists.Select(a => a.ToArray()).ToArray();

            for (int i = 1; i < this._template.Length; i++)
            {
                char first = this._template[i - 1];
                char second = this._template[i];
                Console.WriteLine("first {0} second {1}", (int)first - 'A', (int)second - 'A');
                //increment the location on the graph where the index number equals 
                // the ascii equivalent calculation based on the size of the table
                this._observedPairs[first - 'A'][second - 'A']++;
            }

            DumpGraph(this._observedPairs);

        }
        public void PartOne()
        {
            this.ParsePolymerTemplate();
            this.ParseInsertionRules();
            this.ParseCurrentPairsOnStep();

            // for (int i = 0; i < this._steps; i++)
            // {
            //     Console.WriteLine("-----------------------");
            //     Console.WriteLine("step number {0}", i + 1);
            //     Console.WriteLine("-----------------------");
            //     this.ParseCurrentPairsOnStep();

            // }

            Console.WriteLine("Part 1: {0}");
        }
        public void PartTwo()
        {
            Console.WriteLine("Part 2: {0}");
        }
    }
}
