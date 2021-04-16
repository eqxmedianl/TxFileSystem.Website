/**
 * 
 * Redistribution and use in source and binary forms, with or without modification, are permitted 
 * provided that the conditions mentioned in the shipped license are met.
 * 
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 * 
 */
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
