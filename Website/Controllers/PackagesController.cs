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
namespace TxFileSystem.Website.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using TxFileSystem.Website.Model;
    using TxFileSystem.Website.Repositories;

    [ApiController]
    [Route("[controller]")]
    public class PackagesController : ControllerBase
    {
        private readonly ILogger<PackagesController> _logger;
        private readonly PackageRepository _packageRepository;
        private const string PackageId = "EQXMedia.TxFileSystem";

        public PackagesController(ILogger<PackagesController> logger)
        {
            _logger = logger;
            _packageRepository = new PackageRepository();
        }

        [HttpGet]
        public async Task<IEnumerable<Package>> GetAsync()
        {
            return await _packageRepository.GetPackages(PackageId);
        }
    }
}
