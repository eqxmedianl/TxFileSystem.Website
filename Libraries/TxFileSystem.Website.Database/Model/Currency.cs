namespace TxFileSystem.Website.Database.Model
{
    using CurrencyEnum = Enums.Currency;

    public class Currency
    {
        public CurrencyEnum CurrencyId { get; set; }

        public string Code { get; set; }
    }
}
