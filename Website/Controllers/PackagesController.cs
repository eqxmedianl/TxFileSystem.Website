/**
 * 
 * Redistribution and use in source and binary forms, with or without modification, are permitted 
 * provided that the conditions mentioned in the shipped license are met.
 * 
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 * 
 */
namespace TxFileSystem.Website.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using TxFileSystem.Website.API.DTO;
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
        public async Task<IEnumerable<PackageDTO>> GetAsync()
        {
            return await _packageRepository.GetPackages(PackageId);
        }
    }
}
