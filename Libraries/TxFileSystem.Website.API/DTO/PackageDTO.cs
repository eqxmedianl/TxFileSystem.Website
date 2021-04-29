/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
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