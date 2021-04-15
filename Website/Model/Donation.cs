namespace TxFileSystem.Website.Model
{
    using Newtonsoft.Json;

    public sealed class Donation
    {
        [JsonProperty(PropertyName = "amount")]
        public double Amount { get; set; }

        [JsonProperty(PropertyName = "uuid")]
        public string Uuid { get; set; }
    }
}