namespace Day14
{
    class MainClass
    {
        public string input = "";
        public string[] _lines = new string[] { "" };
        public string _template = "";
        public string _tempTemplate = "";
        public List<string> _observedPairs = new();
        public Dictionary<string, string> _insertionRules = new();
        public Dictionary<string, string> _wasInserted = new();
        int _steps = 3;

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
            this._observedPairs = new List<string>();
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
        private void ParseCurrentPairsOnStep()
        {
            this._observedPairs = new List<string>();
            for (int i = 1; i < this._template.Length; i++)
            {
                this._observedPairs.Add(string.Concat(this._template[i - 1], this._template[i]));
            }
        }
        // check if the rule matches one of the pairs in the template
        private bool ShouldInsert(string rule, string pair)
        {
            return rule == pair;
        }
        // when an insertion rule suggests that two characters are immediately adjacent
        // in the template, to insert the letter after -> between the adjacent letters in the rule
        private void ApplyInsertion()
        {
            foreach (string pair in this._observedPairs)
            {
                foreach (string rule in this._insertionRules.Keys)
                {
                    string str = "";
                    if (this.ShouldInsert(rule, pair) && !this._wasInserted.TryGetValue(rule, out str!))
                    {
                        this._wasInserted.TryAdd(rule, rule);

                        Console.WriteLine("******** start insertion");
                        Console.WriteLine("current template before {0}", this._template);
                        Console.WriteLine("-- current pairs observed -- {0}", string.Join(", ", this._observedPairs));

                        this.RemakeTemplate(rule, this._insertionRules[rule]);

                        Console.WriteLine("current template after {0}", this._template);
                        Console.WriteLine("******** end insertion");
                    }
                }
            }
            this._wasInserted.Clear();
        }
        private void RemakeTemplate(string currentPairRule, string letterToInsert)
        {
            int fromFirstLetter = 0;
            int fromSecondLetter = 0;
            List<string> begOfTemplate = new();
            List<string> endOfTemplate = new();

            // splitting work around since c sharp string.Split() method doesn't have an overload like this .Split("");
            List<string> splitTemplate = this._template.Select(x => x.ToString()).ToList();

            for (int i = 1; i < splitTemplate.Count(); i++)
            {
                fromFirstLetter = i - 1;
                fromSecondLetter = i;

                string pair = string.Concat(splitTemplate[fromFirstLetter], splitTemplate[fromSecondLetter]);
                Console.WriteLine(" ---- current pair {0} \n ---- current rule {1} \n----- current letter to insert {2}", pair, currentPairRule, letterToInsert);

                if (pair == currentPairRule)
                {
                    begOfTemplate = splitTemplate.Take(fromSecondLetter).ToList();
                    endOfTemplate = splitTemplate.Skip(fromSecondLetter).ToList();
                    begOfTemplate.Add(letterToInsert);

                    Console.WriteLine(" ---- beg of template {0} \n----- end of tempalte {1}", string.Join(", ", begOfTemplate), string.Join(", ", endOfTemplate));

                    List<string> wholeTemplate = begOfTemplate.Concat(endOfTemplate).ToList();

                    Console.WriteLine("whole template {0}", string.Join(", ", wholeTemplate));

                    this._template = string.Join("", wholeTemplate);
                }
            }
        }
        public void PartOne()
        {
            this.ParsePolymerTemplate();
            this.ParseInsertionRules();

            for (int i = 0; i < this._steps; i++)
            {
                Console.WriteLine("-----------------------");
                Console.WriteLine("step number {0}", i + 1);
                Console.WriteLine("-----------------------");
                this.ParseCurrentPairsOnStep();
                this.ApplyInsertion();
            }

            Console.WriteLine("Part 1: {0}");
        }
        public void PartTwo()
        {
            Console.WriteLine("Part 2: {0}");
        }
    }
}
