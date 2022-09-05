cat << EOF > Program.cs
namespace $1
{
    class MainClass
    {
        public string input = "";
        public string[] _lines = new string[] { "" };
        public static void Main(string[] args)
        {
            new MainClass().Run(args);
        }   
        public void Run(string[] args)
        {
            this.GetInput(args[0]);
            this.PartOne();
            this.PartTwo();
        }
        public void GetInput(string fileName)
        {
            this.input = File.ReadAllText(fileName);
            this._lines = input.Split("\n");
        }
        public void PartOne()
        {
            Console.WriteLine("Part 1: ");
        }
        public void PartTwo()
        {
            Console.WriteLine("Part 2: ");
        }
    }
}
EOF