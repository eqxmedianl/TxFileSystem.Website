namespace TxFileSystem.Website.Model
{
    using Newtonsoft.Json;

    public sealed class Payment
    {
        [JsonProperty("transactionId")]
        public string TransactionId { get; set; }
    }
}
