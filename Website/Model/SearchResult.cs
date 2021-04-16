/**
 * 
 * Redistribution and use in source and binary forms, with or without modification, are permitted 
 * provided that the conditions mentioned in the shipped license are met.
 * 
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 * 
 */
namespace TxFileSystem.Website.Model
{
    using Newtonsoft.Json;
    using System.Collections.Generic;

    public sealed class SearchResult
    {
        [JsonProperty("id")]
        public string PackageId { get; set; }

        [JsonProperty("totalDownloads")]
        public long TotalDownloads { get; set; }

        [JsonProperty("versions")]
        public IReadOnlyList<SearchResultVersion> Versions { get; set; }
    }
}
