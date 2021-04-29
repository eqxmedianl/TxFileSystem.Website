namespace TxFileSystem.Website.API.Results
{
    using Microsoft.AspNetCore.Mvc;
    using System.IO;
    using System.Threading.Tasks;

    public sealed class DocumentationResult : IActionResult
    {
        public DocumentationResult(FileStream fileStream, string contentType)
        {
            this.FileStream = fileStream;
            this.ContentType = contentType;
        }
        
        public FileStream FileStream { get; private set; }

        public string ContentType { get; private set; }

        public Task ExecuteResultAsync(ActionContext context)
        {
            var result = new FileStreamResult(this.FileStream, this.ContentType);

            return result.ExecuteResultAsync(context);
        }
    }
}
