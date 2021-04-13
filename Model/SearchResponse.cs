namespace TxFileSystem.Website.Model
{
    using Newtonsoft.Json;
    using System.Collections.Generic;

    /// <summary>
    /// The response to a search query.
    ///
    /// See https://docs.microsoft.com/en-us/nuget/api/search-query-service-resource#response
    /// </summary>
    public sealed class SearchResponse
    {
        /// <summary>
        /// The packages that matched the search query.
        /// </summary>
        [JsonProperty("data")]
        public IReadOnlyList<SearchResult> Data { get; set; }
    }
}
