namespace Day14
{
    class MainClass
    {
        public string input = "";
        public string[] _lines = new string[] { "" };
        public string _template = "";
        public List<string> _insertionRules = new List<string>();
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
        private void ParsePolymerTemplate()
        {
            this._template = this._lines[0];
        }
        private void ParseInsertionRules()
        {
            for (int i = 2; i < this._lines.Length; i++)
            {
                this._insertionRules.Add(this._lines[i]);
            }
        }
        public void Init()
        {
            this.input = "";
            this._lines = new string[] { "" };
            this._template = "";
        }
        public void GetInput(string fileName)
        {
            this.input = File.ReadAllText(fileName);
            this._lines = input.Split("\n");
        }
        public void PartOne()
        {
            this.ParsePolymerTemplate();
            this.ParseInsertionRules();
            Console.WriteLine("template: {0}", this._template);
            Console.WriteLine("insertionRules: {0}", string.Join(", ", this._insertionRules));
            Console.WriteLine("Part 1: {0}");
        }
        public void PartTwo()
        {
            Console.WriteLine("Part 2: {0}");
        }
    }
}
