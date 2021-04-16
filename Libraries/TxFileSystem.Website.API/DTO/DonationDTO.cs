namespace TxFileSystem.Website.API.DTO
{
    using Newtonsoft.Json;

    public sealed class DonationDTO
    {
        [JsonProperty(PropertyName = "amount")]
        public double Amount { get; set; }

        [JsonProperty(PropertyName = "uuid")]
        public string Uuid { get; set; }
    }
}