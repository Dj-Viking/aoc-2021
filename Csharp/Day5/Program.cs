namespace Day5
{
    class MainClass
    {
        public string input = "";
        public string[] _lines = new string[] { "" };
        List<List<int>> _points = new();
        int[][] _graph = new int[][] { new int[] { 0 } };
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
            this._graph = new int[][] { new int[] { 0 } };
            this._points = new List<List<int>>();

        }
        public void GetInput(string fileName)
        {
            this.input = File.ReadAllText(fileName);
            this._lines = input.Split("\n");

        }
        public void ParseCoordinates()
        {
            string[] coordinates = new string[] { "" };

            for (int i = 0; i < this._lines.Length; i++)
            {
                coordinates = this._lines[i].Split(" -> ");

                int x1 = int.Parse(coordinates[0].Split(",")[0]);
                int y1 = int.Parse(coordinates[0].Split(",")[1]);
                List<int> temp1 = new();
                temp1.Add(x1);
                temp1.Add(y1);

                int x2 = int.Parse(coordinates[1].Split(",")[0]);
                int y2 = int.Parse(coordinates[1].Split(",")[1]);
                List<int> temp2 = new();
                temp2.Add(x2);
                temp2.Add(y2);

                this._points.Add(temp1);
                this._points.Add(temp2);

            }
        }
        private void DumpGraph(List<List<int>> graph)
        {
            string str = "";
            for (int y = 0; y < graph.Count; y++)
            {
                for (int x = 0; x < graph[y].Count; x++)
                {
                    str += graph[y][x] == 0 ? ("." + " ") : graph[y][x].ToString();
                }
                Console.WriteLine("{0}", str);
                str = "";
            }
        }
        private void BuildGraph()
        {
            int MaxHeight = this._points.Count * 2;

            Array.Resize(ref this._graph, MaxHeight);

            Console.WriteLine("resized length? {0}", this._graph.Length);

        }
        public void PartOne()
        {
            this.ParseCoordinates();
            this.BuildGraph();
            Console.WriteLine("Part 1: ");
        }
        public void PartTwo()
        {
            Console.WriteLine("Part 2: ");
        }
    }
}
