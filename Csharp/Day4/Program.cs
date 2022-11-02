namespace Day4
{
    class MainClass
    {
        public string input = "";
        public List<string> _drawnNums = new();
        public List<List<string>> _boardRows = new();
        public Dictionary<int, List<List<string>>> _boards = new();
        public Dictionary<int, int> _winningBoards = new();
        public FinishResult1 _finishResult1 = new FinishResult1("", 0);
        public FinishResult2 _finishResult2 = new FinishResult2("", 0);
        public class FinishResult1
        {
            public string _lastDraw = "";
            public int _whoWon = 0;
            public FinishResult1(string lastDraw, int whoWon)
            {
                this._lastDraw = lastDraw;
                this._whoWon = whoWon;
            }
        }
        public class FinishResult2
        {
            public string _lastDraw = "";
            public int _whosLast = 0;
            public FinishResult2(string lastDraw, int whosLast)
            {
                this._lastDraw = lastDraw;
                this._whosLast = whosLast;
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
            this._drawnNums = new List<string>();
            this._boardRows = new List<List<string>>();
            this._boards = new Dictionary<int, List<List<string>>>();
            this._winningBoards = new Dictionary<int, int>();
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
        private void MarkBoardsPart1()
        {
            for (int n = 0; n < this._drawnNums.Count; n++) //for each drawn number
            {
                for (int b = 0; b < this._boards.Keys.Count; b++) //for each board
                {
                    for (int r = 0; r < this._boards.GetValueOrDefault(b)!.Count; r++) //for each row of the board
                    {
                        for (int c = 0; c < this._boards.GetValueOrDefault(b)![r].Count; c++) //for each column of each row
                        {
                            if (this._boards.GetValueOrDefault(b)![r][c] == this._drawnNums[n])
                            {   //mark board with "x" where drawn number matches the board number slot
                                this._boards.GetValueOrDefault(b)![r][c] = "x";
                                // check how many x's are in a particular row
                                List<string> rowExes = this._boards.GetValueOrDefault(b)![r].FindAll(slot => slot == "x");

                                if (rowExes.Count == 5)
                                {
                                    this._finishResult1 = new FinishResult1(this._drawnNums[n], b);
                                    return;
                                }
                            }
                        }
                    }
                }
            }
        }
        private List<string> GetEntireColumn(List<List<string>> matrix, int col)
        {
            List<string> column = new();
            for (int i = 0; i < matrix.Count; i++)
            {
                column.Add(matrix[i][col]);
            }
            return column;
        }
        private int GetColumnNumber(List<List<string>> matrix, string drawnNum)
        {
            int colNum = 0;
            for (int r = 0; r < matrix.Count; r++)
            {
                for (int c = 0; c < matrix[r].Count; c++)
                {
                    if (matrix[r][c] == drawnNum)
                    {
                        colNum = c;
                        goto ret;
                    }
                }
            }
        ret:
            return colNum;
        }
        private void MarkBoardsPart2()
        {
            for (int n = 0; n < this._drawnNums.Count; n++) //for each drawn number
            {
                for (int b = 0; b < this._boards.Keys.Count; b++) //for each board
                {
                    for (int r = 0; r < this._boards.GetValueOrDefault(b)!.Count; r++) //for each row of the board
                    {
                        for (int c = 0; c < this._boards.GetValueOrDefault(b)![r].Count; c++) //for each column of each row
                        {
                            if (this._boards.GetValueOrDefault(b)![r][c] == this._drawnNums[n])
                            {
                                int colNum = this.GetColumnNumber(this._boards.GetValueOrDefault(b)!, this._drawnNums[n]);
                                this._boards.GetValueOrDefault(b)![r][c] = "x";
                                // check how many x's are in a particular row
                                List<string> rowExes = this._boards.GetValueOrDefault(b)![r].FindAll(slot => slot == "x");

                                List<string> colExes = this.GetEntireColumn(this._boards.GetValueOrDefault(b)!, colNum).FindAll(slot => slot == "x");

                                if (rowExes.Count == 5 || colExes.Count == 5)
                                {
                                    this._finishResult2 = new FinishResult2(this._drawnNums[n], b);
                                    return;
                                }
                            }
                        }
                    }
                }
            }
        }
        private int GetScore1()
        {
            int sum = 0;
            List<int> nums = new();
            for (int r = 0; r < this._boards.GetValueOrDefault(this._finishResult1._whoWon)!.Count; r++)
            {
                for (int c = 0; c < this._boards.GetValueOrDefault(this._finishResult1._whoWon)![r].Count; c++)
                {
                    int parsed = 0;
                    if (int.TryParse(this._boards.GetValueOrDefault(this._finishResult1._whoWon)![r][c], out parsed))
                    {
                        nums.Add(parsed);
                    }
                }
            }
            sum = nums.Sum();
            return sum * int.Parse(this._finishResult1._lastDraw);
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
            Console.WriteLine("amount of keys: {0}", this._boards.Keys.Count());
            foreach (int key in this._boards.Keys)
            {
                Console.WriteLine("value of List<List<string>>: {0}", this._boards[key]);
                foreach (List<string> val in this._boards[key])
                {

                    Console.WriteLine("value of keyval List<string> row: {0}", string.Join(",", val));
                }
            }
        }
        private void AllocateDrawnNums(string input)
        {
            string[] lines = input.Split(Environment.NewLine);
            string[] inputDrawnNums = lines[0].Split(",");

            for (int j = 0; j < inputDrawnNums.Length; j++)
            {
                this._drawnNums.Add(inputDrawnNums[j]);
            }
        }
        public void PartOne()
        {
            this.AllocateDrawnNums(this.input);
            this.AllocateBoards(this.input);
            this.CreateBoardsFromParsedRows();
            this.MarkBoardsPart1();
            Console.WriteLine("Part 1: {0}", this.GetScore1());
        }
        public void PartTwo()
        {
            this.AllocateDrawnNums(this.input);
            this.AllocateBoards(this.input);
            this.CreateBoardsFromParsedRows();
            this.MarkBoardsPart2();
            Console.WriteLine("Part 2: ");
        }
    }
}
