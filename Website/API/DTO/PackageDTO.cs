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
namespace TxFileSystem.Website.API.DTO
{
    using System;

    public sealed class PackageDTO
    {
        public PackageDTO(Uri iconUrl, string title, string description, string version, long downloadCount, string lastUpdated)
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