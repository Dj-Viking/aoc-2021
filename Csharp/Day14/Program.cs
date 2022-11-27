namespace Day14
{
    class MainClass
    {
        public string input = "";
        public string[] _lines = new string[] { "" };
        public string _template = "";
        public int[][] _observedPairs = new int[][] { new int[] { 0 } };
        public int[][] _backTable = new int[][] { new int[] { 0 } };
        public int[] _freq = new int[] { 0 };
        public int _steps = 10;
        public int TABLE_CAP = ('Z' - 'A') + 1;
        public List<Substitution> _subsList = new();
        public class Substitution
        {
            public char _first = ' ';
            public char _second = ' ';
            public char _insertion = ' ';
            public Substitution(char first, char second, char insertion)
            {
                this._first = first;
                this._second = second;
                this._insertion = insertion;
            }
        }
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
        private void ParseInsertionRulesOnStep()
        {
            for (int i = 2; i < this._lines.Length; i++)
            {
                string rule = this._lines[i].Split(" -> ")[0];
                string insertion = this._lines[i].Split(" -> ")[1];
                Substitution sub = new Substitution(rule[0], rule[1], insertion.ToCharArray()[0]);
                Console.WriteLine("sub added {0}{1} -> {2}", sub._first, sub._second, sub._insertion);
                this._subsList.Add(sub);
            }
            Console.WriteLine("subs count {0}", this._subsList.Count());
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
                    if (graph[i][j] != 0)
                        Console.Write("{0} ", graph[i][j]);
                    else
                        Console.Write(". ");
                }
                Console.Write(Environment.NewLine);
            }
        }
        private void ParseCurrentPairsOnStep()
        {
            this._observedPairs = this.InitializeGraph();

            for (int i = 1; i < this._template.Length; i++)
            {
                char first = this._template[i - 1];
                char second = this._template[i];
                Console.WriteLine("first {0} second {1}", (int)first - 'A', (int)second - 'A');
                //increment the location on the graph where the coordinate equals 
                // the ascii equivalent calculation based on the size of the 2D graph
                this._observedPairs[first - 'A'][second - 'A']++;
            }

        }
        private void PairInsertion()
        {
            // iterate through all subs
            int i, numOfPairs;
            this._backTable = InitializeGraph();
            for (i = 0; i < this._subsList.Count(); i++)
            {
                numOfPairs = this._observedPairs![this._subsList[i]._first - 'A'][this._subsList[i]._second - 'A'];

                this._backTable[this._subsList[i]._first - 'A'][this._subsList[i]._insertion - 'A'] += numOfPairs;
                this._backTable[this._subsList[i]._insertion - 'A'][this._subsList[i]._second - 'A'] += numOfPairs;
            }
            this._observedPairs = this._backTable.Select(x => x.ToArray()).ToArray();
        }
        public int[][] InitializeGraph()
        {
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

            return lists.Select(a => a.ToArray()).ToArray();
        }
        public void PartOne()
        {
            this.ParsePolymerTemplate();
            this.ParseCurrentPairsOnStep();
            this.ParseInsertionRulesOnStep();

            this.DumpGraph(this._observedPairs);

            for (int i = 0; i < this._steps; i++)
            {
                this.PairInsertion();
                this.DumpGraph(this._observedPairs);
            }

            Console.WriteLine("Part 1: {0}");
        }
        public void PartTwo()
        {
            Console.WriteLine("Part 2: {0}");
        }
    }
}
