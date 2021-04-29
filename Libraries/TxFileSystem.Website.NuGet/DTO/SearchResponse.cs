/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 *
 */
namespace TxFileSystem.Website.NuGet
{
    using Newtonsoft.Json;
    using System.Collections.Generic;

    public sealed class SearchResponse
    {
        [JsonProperty("data")]
        public IReadOnlyList<SearchResult> Data { get; set; }
    }
}
