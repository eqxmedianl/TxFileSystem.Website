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
namespace TxFileSystem.Website.Repositories
{
    using global::NuGet.Configuration;
    using global::NuGet.Protocol;
    using global::NuGet.Protocol.Core.Types;
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Threading;
    using System.Threading.Tasks;
    using TxFileSystem.Website.API.DTO;
    using TxFileSystem.Website.NuGet;

    public sealed class PackageRepository
    {
        public async Task<IEnumerable<PackageDTO>> GetPackages(string packageId)
        {
            var logger = new Logger();

            var cancellationTokenSource = new CancellationTokenSource();

            var metaData = await GetPackageSearchMetaDataAsync(packageId, logger, cancellationTokenSource);

            var versionDownloadCountsLookup = await GetPackageVersionDownloadCounts(packageId);
            var versionReleaseDateLookup = await GetPackageVersionReleaseDates(packageId, logger);

            return metaData.Where(m => m.IsListed)
                .OrderByDescending(m => ((PackageSearchMetadataRegistration)m).Version)
                .Select(m =>
                {
                    var r = ((PackageSearchMetadataRegistration)m);
                    return new PackageDTO(r.IconUrl, r.Title, r.Description, r.Version.ToNormalizedString(),
                        versionDownloadCountsLookup.Versions.First(v => v.Version == r.Version.ToNormalizedString()).Downloads,
                        versionReleaseDateLookup.First(v => v.Item1 == r.Version.ToNormalizedString()).Item2.ToString());
                });
        }

        private static async Task<IEnumerable<IPackageSearchMetadata>> GetPackageSearchMetaDataAsync(string packageId, Logger logger,
            CancellationTokenSource cancellationTokenSource)
        {
            var providers = new List<Lazy<INuGetResourceProvider>>();
            providers.AddRange(Repository.Provider.GetCoreV3());

            var packageSource = new PackageSource("https://api.nuget.org/v3/index.json");
            var sourceRepository = new SourceRepository(packageSource, providers);
            var packageMetadataResource = await sourceRepository.GetResourceAsync<PackageMetadataResource>();
            var metaData = await packageMetadataResource
                .GetMetadataAsync(packageId, true, true, new SourceCacheContext(), logger, cancellationTokenSource.Token);
            return metaData;
        }

        private static async Task<List<Tuple<string, DateTime>>> GetPackageVersionReleaseDates(string packageId, Logger logger)
        {
            var versionReleaseDateLookup = new List<Tuple<string, DateTime>>();
            var repository = Repository.Factory.GetCoreV3("https://api.nuget.org/v3/index.json");
            var registrationResource = await repository.GetResourceAsync<RegistrationResourceV3>();
            var packageMetaData = await registrationResource.GetPackageMetadata(packageId, false, false,
                new SourceCacheContext(), logger, CancellationToken.None);

            foreach (var md in packageMetaData)
            {
                versionReleaseDateLookup.Add(new Tuple<string, DateTime>(md.Value<string>("version"),
                    md.Value<DateTime>("published")));
            }

            return versionReleaseDateLookup;
        }

        private static async Task<SearchResult> GetPackageVersionDownloadCounts(string packageId)
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
