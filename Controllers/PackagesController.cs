namespace TxFileSystem.Website.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;
    using NuGet.Configuration;
    using NuGet.Protocol;
    using NuGet.Protocol.Core.Types;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Threading;
    using System.Threading.Tasks;

    [ApiController]
    [Route("[controller]")]
    public class PackagesController : ControllerBase
    {
        private readonly ILogger<PackagesController> _logger;

        public PackagesController(ILogger<PackagesController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<Package>> GetAsync()
        {
            var packageId = "EQXMedia.TxFileSystem";

            var logger = new Logger();

            var cancellationTokenSource = new CancellationTokenSource();

            var providers = new List<Lazy<INuGetResourceProvider>>();
            providers.AddRange(Repository.Provider.GetCoreV3());  // Add v3 API support
            var packageSource = new PackageSource("https://api.nuget.org/v3/index.json");
            var sourceRepository = new SourceRepository(packageSource, providers);
            var packageMetadataResource = await sourceRepository.GetResourceAsync<PackageMetadataResource>();
            var metaData = await packageMetadataResource
                .GetMetadataAsync("EQXMedia.TxFileSystem", true, true, new SourceCacheContext(), logger, cancellationTokenSource.Token);

            var versions = await GetSearchResultAsync(packageId);
            var repository = Repository.Factory.GetCoreV3("https://api.nuget.org/v3/index.json");
            var tuples = await GetPackageMetaDataAsync(packageId, logger, repository);

            return metaData.Where(m => m.IsListed)
                .OrderByDescending(m => ((NuGet.Protocol.PackageSearchMetadataRegistration)m).Version)
                .Select(m =>
                {
                    var r = ((NuGet.Protocol.PackageSearchMetadataRegistration)m);
                    return new Package(r.IconUrl, r.Title, r.Description, r.Version.ToNormalizedString(),
                        versions.Versions.First(v => v.Version == r.Version.ToNormalizedString()).Downloads,
                        tuples.First(v => v.Item1 == r.Version.ToNormalizedString()).Item2.ToString());
                });
        }

        private static async Task<List<Tuple<string, DateTime>>> GetPackageMetaDataAsync(string packageId, Logger logger, SourceRepository repository)
        {
            var tuples = new List<Tuple<string, DateTime>>();
            var registrationResource = await repository.GetResourceAsync<RegistrationResourceV3>();
            var packageMetaData = await registrationResource.GetPackageMetadata(packageId, false, false, new SourceCacheContext(), logger, CancellationToken.None);
            foreach (var md in packageMetaData)
            {
                tuples.Add(new Tuple<string, DateTime>(md.Value<string>("version"), md.Value<DateTime>("published")));
            }

            return tuples;
        }

        private async Task<SearchResult> GetSearchResultAsync(string packageId)
        {
            // 1. Find the latest search endpoint using the NuGet Service Index API
            // See: https://docs.microsoft.com/en-us/nuget/api/service-index
            var source = new PackageSource("https://api.nuget.org/v3/index.json");
            var providers = Repository.Provider.GetCoreV3();
            var repository = new SourceRepository(source, providers);

            var serviceIndex = await repository.GetResourceAsync<ServiceIndexResourceV3>();
            var searchEndpoints = serviceIndex.GetServiceEntryUris(ServiceTypes.SearchQueryService);

            if (!searchEndpoints.Any())
            {
                Console.WriteLine("Unable to find search endpoints");
                return default;
            }

            // 2. Find your package's latest metadata using the NuGet Search V3 API 
            // See: https://docs.microsoft.com/en-us/nuget/api/search-query-service-resource
            var query = new Uri(searchEndpoints.First().ToString() + $"?q=packageid:{packageId}&prerelease=true&semVerLevel=2.0.0");

            using var httpClient = new HttpClient();
            using var response = await httpClient.GetAsync(query);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                Console.WriteLine($"Unexpected response status code {response.StatusCode}: {response.ReasonPhrase}");
                return default;
            }

            var content = await response.Content.ReadAsStringAsync();
            var results = JsonConvert.DeserializeObject<SearchResponse>(content);

            return results.Data.First(p => p.PackageId == packageId);
        }
    }
}
