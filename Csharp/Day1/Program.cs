using System.IO;
namespace Day1
{
    class MainClass
    {
        public string input = "";
        public int partOneMeasurements = 0;
        public string[] lines = new string[] { "" };
        public static void Main(string[] args)
        {
            new MainClass().Run(args);
        }
        public void Run(string[] args)
        {
            this.GetInput(args[0]);
            this.PartOne();
        }
        public void GetInput(string fileName)
        {
            this.input = File.ReadAllText(fileName);
            this.lines = input.Split("\n");
        }
        public void PartOne()
        {
            string[] lines = this.lines;
            for (int i = 1; i < lines.Length; i++)
            {
                int current = int.Parse(lines[i]);
                int previous = int.Parse(lines[i - 1]);
                if (current > previous)
                {
                    this.partOneMeasurements += 1;
                }
            }
            Console.WriteLine("Part 1: {0}", this.partOneMeasurements);
        }
        public void PartTwo()
        {

        }
    }
}
