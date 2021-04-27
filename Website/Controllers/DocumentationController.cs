﻿/**
 * 
 * Redistribution and use in source and binary forms, with or without modification, are permitted 
 * provided that the conditions mentioned in the shipped license are met.
 * 
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 * 
 */
namespace TxFileSystem.Website.Controllers
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.StaticFiles;
    using Microsoft.Extensions.Logging;
    using System;
    using System.IO;
    using TxFileSystem.Website.API.Results;

    [ApiController]
    [Route("docs/view")]
    [Produces("text/html", "text/css", "application/javascript", "text/javascript", "image/gif", "image/jpg", "image/png")]
    public class DocumentationController : ControllerBase
    {
        private readonly ILogger<DocumentationController> _logger;

        public DocumentationController(ILogger<DocumentationController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("{**topicParts}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DocumentationResult))]
        public IActionResult GetTopic(string topicParts)
        {
            string projectRootPath = AppDomain.CurrentDomain.BaseDirectory;

            string path = string.Empty;

            if (topicParts == "index")
            {
                path = projectRootPath + "/docs/index.html";
            }
            else
            {
                path = System.IO.Path.Combine(projectRootPath, "docs", topicParts);
            }

            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }

            return new DocumentationResult(new FileStream(path, FileMode.Open), contentType);
        }
    }
}