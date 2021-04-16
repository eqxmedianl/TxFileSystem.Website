namespace TxFileSystem.Website.Service
{
    static class Purger
    {
        static void Main(string[] args)
        {
            var purgeService = new PurgeService();
            purgeService.Run();
        }
    }
}
