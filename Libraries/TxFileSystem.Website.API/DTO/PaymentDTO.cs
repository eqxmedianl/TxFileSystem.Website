namespace TxFileSystem.Website.API.DTO
{
    using Newtonsoft.Json;

    public sealed class PaymentDTO
    {
        [JsonProperty("transactionId")]
        public string TransactionId { get; set; }
    }
}
