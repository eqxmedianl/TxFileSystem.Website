namespace TxFileSystem.Website
{
    using System;

    public class Package
    {
        public Package(Uri iconUrl, string title, string description, string version, long downloadCount, string lastUpdated = "")
        {
            IconUrl = iconUrl;
            Title = title;
            Description = description;
            Version = version;
            DownloadCount = downloadCount;
            LastUpdated = lastUpdated;
        }

        public Uri IconUrl { get; }

        public string Title { get; }

        public string Description { get; }

        public string Version { get; }

        public long DownloadCount { get; }

        public string LastUpdated { get; }
    }
}