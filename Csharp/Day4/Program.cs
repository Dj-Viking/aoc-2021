namespace Day4
{
    class MainClass
    {
        public string input = "";
        public List<string> _drawnNums = new();
        public List<List<string>> _boardRows = new();
        public Dictionary<int, List<List<string>>> _boards = new();
        public int lastDrawn = 0;
        public int boardWon = 0;
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
            this._drawnNums = new List<string>();
            this._boardRows = new List<List<string>>();
            this.lastDrawn = 0;
            this.boardWon = 0;
            this._boards = new Dictionary<int, List<List<string>>>();
        }
        public void GetInput(string fileName)
        {
            this.input = File.ReadAllText(fileName);
        }
        private void AllocateBoards(string input)
        {
            int boundaryCursor = 0;
            int boundaryLimit = 6;
            string[] lines = input.Split(Environment.NewLine);

            for (int i = 2; i < lines.Length; i++)
            {
                List<string> rowDigits = new();
                List<string> tempRow = new();

                boundaryCursor++;
                if (boundaryCursor == boundaryLimit)
                    boundaryCursor = 0;

                if (boundaryCursor >= 1 && boundaryCursor <= 5)
                {
                    // separate lines[i] into it's digits to trim whitespace
                    rowDigits = lines[i].Split(" ").ToList();
                    for (int c = 0; c < rowDigits.Count(); c++)
                    {
                        if (!string.IsNullOrWhiteSpace(rowDigits[c].Trim()) || !string.IsNullOrEmpty(rowDigits[c].Trim()))
                        {
                            tempRow.Add(rowDigits[c].Trim());
                        }
                    }
                    this._boardRows.Add(tempRow);
                    tempRow = new List<string>();
                }

            }
            return;
        }
        private void CreateBoardsFromParsedRows()
        {
            int tempBoardNum = 0;
            int boundaryCursor = 0;
            int boundaryLimit = 6;
            List<List<string>> tempListOfLists = new();
            List<string> tempList = new();

            for (int i = 0; i < this._boardRows.Count(); i++)
            {
                boundaryCursor++;
                if (boundaryCursor == boundaryLimit)
                {
                    boundaryCursor = 1;
                    tempBoardNum++;
                    tempListOfLists = new List<List<string>>();
                }

                if (boundaryCursor >= 1 && boundaryCursor <= 5)
                {
                    Console.WriteLine("tempBoardNum {0} - boundaryCursor {1}", tempBoardNum, boundaryCursor);
                    tempList = this._boardRows[i];
                    bool hasValue = this._boards.TryGetValue(tempBoardNum, out tempListOfLists!);
                    if (hasValue)
                    {
                        //add to tempListOfLists and then add to the board key value
                        tempListOfLists.Add(tempList);
                        if (!tempListOfLists.Any(list => list == tempList))
                        {
                            this._boards[tempBoardNum].Add(tempList);
                        }
                    }
                    else
                    {
                        //add the current boardRow[i] to the current tmepboardnum we are on
                        List<List<string>> tempTempListOfLists = new();
                        tempTempListOfLists.Add(tempList);
                        this._boards.Add(tempBoardNum, tempTempListOfLists);
                    }
                }

            }
        }
        private void MarkBoards()
        {
        }
        private void DumpBoardRows(List<List<string>> boardRows)
        {
            for (int r = 0; r < boardRows.Count(); r++)
            {
                Console.WriteLine("row {1}: {0}", string.Join(",", boardRows[r]), r);
            }
        }
        private void DumpBoardDict()
        {
            Console.WriteLine("amount of keys {0}", this._boards.Keys.Count());
            foreach (int key in this._boards.Keys)
            {
                Console.WriteLine("value {0}", this._boards[key]);
                foreach (List<string> val in this._boards[key])
                {

                    Console.WriteLine("value of keyval {0}", string.Join(",", val));
                }
            }
        }
        private void AllocateDrawnNums(string input)
        {
            string[] lines = input.Split(Environment.NewLine);

            for (int i = 0; i < lines.Length; i++)
            {
                if (i == 0)
                {
                    string[] inputDrawnNums = lines[i].Split(",");

                    for (int j = 0; j < inputDrawnNums.Length; j++)
                    {
                        this._drawnNums.Add(inputDrawnNums[j]);
                    }

                    goto exit;
                }
            }

        exit:
            return;
        }
        public void PartOne()
        {
            this.AllocateDrawnNums(this.input);
            this.AllocateBoards(this.input);
            this.DumpBoardRows(this._boardRows);
            this.CreateBoardsFromParsedRows();
            this.DumpBoardDict();
            // this.MarkBoards();
            Console.WriteLine("Part 1: ");
        }
        public void PartTwo()
        {
            Console.WriteLine("Part 2: ");
        }
    }
}
