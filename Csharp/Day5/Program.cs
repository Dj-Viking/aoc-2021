namespace Day5
{
    class MainClass
    {
        public string input = "";
        public string[] _lines = new string[] { "" };
        public List<List<int>> _points = new();
        public int[][] _graph = new int[][] { new int[] { 0 } };
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
                List<int> temp1 = new();

                int x1 = int.Parse(coordinates[0].Split(",")[0]);
                int y1 = int.Parse(coordinates[0].Split(",")[1]);

                temp1.Add(x1);
                temp1.Add(y1);

                int x2 = int.Parse(coordinates[1].Split(",")[0]);
                int y2 = int.Parse(coordinates[1].Split(",")[1]);

                temp1.Add(x2);
                temp1.Add(y2);

                this._points.Add(temp1);
            }
        }
        private void DumpGraph(int[][] graph)
        {
            string str = "";
            for (int y = 0; y < graph.Length; y++)
            {
                for (int x = 0; x < graph[y].Length; x++)
                {
                    str += graph[y][x] == 0 ? ("." + " ") : graph[y][x].ToString() + " ";
                }
                Console.WriteLine("{0}", str);
                str = "";
            }
        }
        private void BuildGraph()
        {
            int MaxHeight = this._points.Count * 2;

            List<List<int>> lists = new List<List<int>>();

            for (int i = 0; i < MaxHeight; i++)
            {
                List<int> tempList = new List<int>();
                for (int j = 0; j < MaxHeight; j++)
                {
                    tempList.Add(0);
                }
                lists.Add(tempList);
            }

            this._graph = lists.Select(a => a.ToArray()).ToArray();

        }
        private void DrawVerticalLine(int x, int y1, int y2)
        {
            int y;
            int[] ys = new int[] { y1, y2 };
            Array.Sort(ys);

            for (y = ys[0]; y <= ys[1]; y++)
            {
                this._graph[y][x]++;
            }
        }
        private void DrawHorizontalLine(int y, int x1, int x2)
        {
            int x;
            int[] xs = new int[] { x1, x2 };
            Array.Sort(xs);

            for (x = xs[0]; x <= xs[1]; x++)
            {
                this._graph[y][x]++;
            }
        }
        private int GetPart1Answer()
        {
            int answer = 0;
            for (int y = 0; y < this._graph.Length; y++)
            {
                for (int x = 0; x < this._graph.Length; x++)
                {
                    if (this._graph[y][x] > 1)
                    {
                        answer++;
                    }
                }
            }
            return answer;
        }

        private void PlotPoints()
        {
            for (int y = 0; y < this._points.Count; y++)
            {
                int x1 = this._points[y][0];
                int y1 = this._points[y][1];
                int x2 = this._points[y][2];
                int y2 = this._points[y][3];

                if (x1 == x2)
                {
                    this.DrawVerticalLine(x1, y1, y2);
                }
                if (y1 == y2)
                {
                    this.DrawHorizontalLine(y1, x1, x2);
                }
            }
        }
        public void PartOne()
        {
            this.ParseCoordinates();
            this.BuildGraph();
            this.PlotPoints();
            Console.WriteLine("Part 1: {0} ", this.GetPart1Answer());
        }
        public void PartTwo()
        {
            Console.WriteLine("Part 2: ");
        }
    }
}
