namespace TxFileSystem.Website.API.Results
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;

    public sealed class DocumentationResult : IActionResult
    {
        public DocumentationResult(string content, string contentType)
        {
            this.Content = content;
            this.ContentType = contentType;
        }
        
        public string Content { get; private set; }

        public string ContentType { get; private set; }

        public Task ExecuteResultAsync(ActionContext context)
        {
            var result = new ContentResult
            {
                ContentType = this.ContentType,
                Content = this.Content,
                StatusCode = StatusCodes.Status200OK,
            };
            return result.ExecuteResultAsync(context);
        }
    }
}
