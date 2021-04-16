/**
 * 
 * The code is this file is subject to EQX Proprietary License. Therefor it is copyrighted and restricted 
 * from being copied, reproduced or redistributed by any party or indiviual other than the original 
 * copyright holder mentioned below.
 * 
 * It's also not allowed to copy or redistribute the compiled binaries without explicit consent.
 * 
 * (c) 2021 EQX Media B.V. - All rights are stricly reserved.
 * 
 */
namespace TxFileSystem.Website.NuGet
{
    using global::NuGet.Common;
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

        public void LogErrorSummary(string data)
        {
            //throw new NotImplementedException();
        }
    }
}
