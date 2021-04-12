namespace TxFileSystem.Website
{
    using NuGet.Common;
    using System.Threading.Tasks;

    public class Logger : ILogger
    {
        public void LogInformationSummary(string data)
        {
            //throw new NotImplementedException();
        }

        public void Log(LogLevel level, string data)
        {
            //throw new NotImplementedException();
        }

        public Task LogAsync(LogLevel level, string data)
        {
            //throw new NotImplementedException();
            return Task.CompletedTask;
        }

        public void Log(ILogMessage message)
        {
            //throw new NotImplementedException();
        }

        public Task LogAsync(ILogMessage message)
        {
            //throw new NotImplementedException();
            return Task.CompletedTask;
        }

        public void LogDebug(string data)
        {
            //throw new NotImplementedException();
        }

        public void LogVerbose(string data)
        {
            //throw new NotImplementedException();
        }

        public void LogInformation(string data)
        {
            //throw new NotImplementedException();
        }

        public void LogMinimal(string data)
        {
            //throw new NotImplementedException();
        }

        public void LogWarning(string data)
        {
            //throw new NotImplementedException();
        }

        public void LogError(string data)
        {
            //throw new NotImplementedException();
        }
    }
}
