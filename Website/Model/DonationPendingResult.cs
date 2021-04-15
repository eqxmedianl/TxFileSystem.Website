namespace TxFileSystem.Website.Model
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;
    using System.Threading.Tasks;

    public sealed class DonationPendingResult : IActionResult
    {
        public DonationPendingResult(string transactionId, string checkoutUrl)
        {
            this.TransactionId = transactionId;
            this.CheckoutUrl = checkoutUrl;
        }

        [JsonProperty(PropertyName = "transactionId")]
        public string TransactionId { get; private set; }

        [JsonProperty(PropertyName = "checkoutUrl")]
        public string CheckoutUrl { get; private set; }

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