namespace Day14
{
    class MainClass
    {
        public string input = "";
        public string[] _lines = new string[] { "" };
        public string _template = "";
        public double[][] _observedPairs = new double[][] { new double[] { 0 } };
        public double[][] _backTable = new double[][] { new double[] { 0 } };
        public Dictionary<char, double> _freq = new();
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
            this._observedPairs = new double[][] { new double[] { 0 } };
            this._subsList = new List<Substitution>();

            for (int i = 0; i < this.TABLE_CAP; i++)
            {
                this._freq[(char)(i + 'A')] = 0;
            }

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
        private void InitializePairs()
        {
            this._observedPairs = this.InitializeGraph();

            //increment the location on the graph where the coordinate equals 
            // the ascii equivalent calculation based on the size of the 2D graph
            for (int i = 1; i < this._template.Length; i++)
            {
                char first = this._template[i - 1];
                char second = this._template[i];
                this._observedPairs[first - 'A'][second - 'A']++;
            }

        }
        private void InitializeRules()
        {
            this._subsList.Clear();
            for (int i = 2; i < this._lines.Length; i++)
            {
                string rule = this._lines[i].Split(" -> ")[0];
                string insertion = this._lines[i].Split(" -> ")[1];
                Substitution sub = new Substitution(rule[0], rule[1], insertion.ToCharArray()[0]);
                this._subsList.Add(sub);
            }
        }
        private void PairInsertion()
        {
            // iterate through all subs
            int i = 0;
            double letterAmount = 0;
            this._backTable = InitializeGraph();
            for (i = 0; i < this._subsList.Count(); i++)
            {
                letterAmount = this._observedPairs![this._subsList[i]._first - 'A'][this._subsList[i]._second - 'A'];

                this._backTable[this._subsList[i]._first - 'A'][this._subsList[i]._insertion - 'A'] += letterAmount;
                this._backTable[this._subsList[i]._insertion - 'A'][this._subsList[i]._second - 'A'] += letterAmount;
            }
            this._observedPairs = this._backTable.Select(x => x.ToArray()).ToArray();
        }
        public double[][] InitializeGraph()
        {
            List<List<double>> lists = new List<List<double>>();

            for (int i = 0; i < this.TABLE_CAP; i++)
            {
                List<double> tempList = new List<double>();
                for (int j = 0; j < this.TABLE_CAP; j++)
                {
                    tempList.Add(0);
                }
                lists.Add(tempList);
            }

            return lists.Select(a => a.ToArray()).ToArray();
        }
        public void IncrementCharacterFrequencies()
        {
            // count how many occurances of the characters in the pairs table 
            for (int i = 0; i < this.TABLE_CAP; i++)
            {
                for (int j = 0; j < this.TABLE_CAP; j++)
                {
                    char charKey = (char)(i + 'A');
                    this._freq[charKey] += this._observedPairs[i][j];
                }
            }

            // increment the last character of the original template because nothing is ever inserted after the last character

            this._freq[this._template[this._template.Length - 1]]++;

        }
        public double CalculateAnswer()
        {
            List<double> temp = new();
            foreach (char key in this._freq.Keys)
            {
                if (this._freq[key] > 0)
                {
                    temp.Add(this._freq[key]);
                }
            }
            return temp.Max() - temp.Min();
        }
        public void PartOne()
        {
            this.ParsePolymerTemplate();
            this.InitializePairs();
            this.InitializeRules();

            for (int i = 0; i < 10; i++)
            {
                this.PairInsertion();
            }

            this.IncrementCharacterFrequencies();

            Console.WriteLine("Part 1: {0}", this.CalculateAnswer());
        }
        public void PartTwo()
        {
            this.ParsePolymerTemplate();
            this.InitializePairs();
            this.InitializeRules();

            for (int i = 0; i < 40; i++)
            {
                this.PairInsertion();
            }

            this.IncrementCharacterFrequencies();

            Console.WriteLine("Part 2: {0}", this.CalculateAnswer());
        }
    }
}
