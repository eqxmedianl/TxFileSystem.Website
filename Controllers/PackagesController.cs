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
