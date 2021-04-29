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
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Infrastructure;
    using Microsoft.AspNetCore.StaticFiles;
    using Microsoft.Extensions.Logging;
    using System;
    using System.IO;
    using TxFileSystem.Website.API.Results;

    [ApiController]
    [Route("docs/view")]
    [Produces("text/html", "text/css", "application/javascript", "text/javascript", "image/gif", "image/jpg", "image/png", "application/xml")]
    public class DocumentationController : ControllerBase
    {
        private readonly ILogger<DocumentationController> _logger;
        private readonly IActionContextAccessor _accessor;

        public DocumentationController(ILogger<DocumentationController> logger,
            IActionContextAccessor accessor)
        {
            _logger = logger;
            _accessor = accessor;
        }

        [HttpGet]
        [Route("{**topicParts}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DocumentationResult))]
        [ProducesResponseType(StatusCodes.Status301MovedPermanently, Type = typeof(RedirectResult))]
        public IActionResult GetTopic(string topicParts)
        {
            string unexpectedReferer = string.Empty;
            if (_accessor.ActionContext.HttpContext.Request.Host.HasValue)
            {
                unexpectedReferer = _accessor.ActionContext.HttpContext.Request.Scheme 
                    + "://" + _accessor.ActionContext.HttpContext.Request.Host.Value
                    + "/docs/topic/html/";
            }

            if (_accessor.ActionContext.HttpContext.Request.Headers.ContainsKey("Referer")
                && !_accessor.ActionContext.HttpContext.Request.Headers["Referer"][0]
                .StartsWith(unexpectedReferer))
            {
                var projectRootPath = AppDomain.CurrentDomain.BaseDirectory;

                string path;
                if (topicParts == "index")
                {
                    path = projectRootPath + "/docs/index.html";
                }
                else
                {
                    path = Path.Combine(projectRootPath, "docs", topicParts);
                    if (!System.IO.File.Exists(path))
                    {
                        path = Path.Combine(projectRootPath, "docs/html", topicParts);
                    }
                }

                var provider = new FileExtensionContentTypeProvider();
                if (!provider.TryGetContentType(path, out string contentType))
                {
                    contentType = "application/octet-stream";
                }

                return new DocumentationResult(new FileStream(path, FileMode.Open), contentType);

            }

            var fileName = topicParts.Remove(0, topicParts.IndexOf('/') + 1);
            var fileInFrameUrl = _accessor.ActionContext.HttpContext.Request.Scheme
                + "://" + _accessor.ActionContext.HttpContext.Request.Host.Value
                + "/docs/"
                + fileName;
            return new RedirectResult(fileInFrameUrl, true);
        }
    }
}
