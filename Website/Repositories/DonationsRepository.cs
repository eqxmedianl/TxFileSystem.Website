namespace TxFileSystem.Website.Repositories
{
    using System;
    using System.Linq;
    using TxFileSystem.Website.Database;
    using TxFileSystem.Website.Database.Model;

    using CurrencyEnum = Database.Model.Enums.Currency;
    using DonationStateEnum = Database.Model.Enums.DonationState;

    public sealed class DonationsRepository
    {
        private readonly WebsiteDbContext _websiteDbContext;

        public DonationsRepository(WebsiteDbContext websiteDbContext)
        {
            _websiteDbContext = websiteDbContext;
        }

        internal void Add(string paymentId, string uuid, double amount, DateTime? createdAt, DateTime? expiresAt)
        {
            var currency = _websiteDbContext.Currencies.First(c => c.CurrencyId == CurrencyEnum.EUR);
            var donationState = _websiteDbContext.DonationStates.First(s => s.DonationStateId == DonationStateEnum.Pending);

            _websiteDbContext.Donations.Add(new Donation()
            {
                Amount = amount,
                Currency = currency,
                State = donationState,
                Uuid = uuid,
                Payment = new MolliePayment(paymentId, createdAt, expiresAt)
            });

            _websiteDbContext.SaveChanges();
        }

        internal void UpdateState(string paymentId, string status)
        {
            var lookedUpDonationState = Enum.GetValues(typeof(DonationStateEnum))
                .Cast<DonationStateEnum>()
                .First(s => s.ToString().ToLower() == status.ToLower());

            var donationState = _websiteDbContext.DonationStates.First(s => s.DonationStateId == lookedUpDonationState);
            var donation = _websiteDbContext.Donations.FirstOrDefault(d => d.Payment.PaymentId == paymentId);
            if (donation != null)
            {
                donation.State = donationState;
                donation.LastUpdated = DateTime.UtcNow;

                _websiteDbContext.SaveChanges();
            }
        }
    }
}
