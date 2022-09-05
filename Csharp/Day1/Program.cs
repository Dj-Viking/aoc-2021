using System.IO;
namespace Day1
{
    class MainClass
    {
        public string input = "";
        public string[] lines = new string[] { "" };
        public static void Main(string[] args)
        {
            new MainClass().Run(args);
        }
        public void Run(string[] args)
        {
            this.GetInput(args[0]);
            for (int i = 0; i < this.lines.Length; i++)
            {
                Console.WriteLine(lines[i]);
            }
        }
        public void GetInput(string fileName)
        {
            // Read entire text file content in one string    
            this.input = File.ReadAllText(fileName);
            this.lines = input.Split("\n");
        }
        public void PartOne()
        {

        }
        public void PartTwo()
        {

        }
    }
}
