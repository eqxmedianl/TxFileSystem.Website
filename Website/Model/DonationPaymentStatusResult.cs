namespace TxFileSystem.Website.Model
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;
    using System.Threading.Tasks;

    public sealed class DonationPaymentStatusResult : IActionResult
    {
        public DonationPaymentStatusResult(string paymentId, string status)
        {
            PaymentId = paymentId;
            Status = status;
        }

        [JsonProperty("paymentId")]
        public string PaymentId { get; }

        [JsonProperty("paymentStatus")]
        public string Status { get; }

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
