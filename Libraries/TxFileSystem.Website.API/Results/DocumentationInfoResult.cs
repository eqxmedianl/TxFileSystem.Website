namespace TxFileSystem.Website.API.Results
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;
    using System.Threading.Tasks;

    public sealed class DocumentationInfoResult : IActionResult
    {
        public DocumentationInfoResult(string title)
        {
            this.Title = title;
        }
        
        [JsonProperty("title")]
        public string Title { get; private set; }

        public Task ExecuteResultAsync(ActionContext context)
        {
            var result = new ObjectResult(this)
            {
                StatusCode = StatusCodes.Status202Accepted
            };

            return result.ExecuteResultAsync(context);
        }
    }
}
