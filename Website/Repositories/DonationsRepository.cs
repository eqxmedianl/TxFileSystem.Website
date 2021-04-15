namespace TxFileSystem.Website.Repositories
{
    using Microsoft.EntityFrameworkCore;
    using Mollie.Api.Models.Payment.Response;
    using System;
    using System.Linq;
    using TxFileSystem.Website.Database;
    using TxFileSystem.Website.Database.Model;

    using CurrencyEnum = Database.Enums.Currency;
    using DonationStateEnum = Database.Enums.DonationState;

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

            PurgeExpired();
        }

        internal void PurgeExpired()
        {
            var now = DateTime.UtcNow;

            var expiredDonations = _websiteDbContext.Donations
                .Include(d => d.Payment)
                .Where(d => d.Payment.ExpiresAt <= now)
                .ToList();

            _websiteDbContext.Donations.RemoveRange(expiredDonations);

            _websiteDbContext.SaveChanges();
        }

        internal void UpdateState(PaymentResponse paymentResponse)
        {
            var lookedUpDonationState = Enum.GetValues(typeof(DonationStateEnum))
                .Cast<DonationStateEnum>()
                .First(s => s.ToString().ToLower() == paymentResponse.Status.ToLower());

            var donationState = _websiteDbContext.DonationStates.First(s => s.DonationStateId == lookedUpDonationState);
            var donation = _websiteDbContext.Donations
                .Include(d => d.Payment)
                .FirstOrDefault(d => d.Payment.PaymentId == paymentResponse.Id);
            if (donation != null)
            {
                donation.State = donationState;
                donation.LastUpdated = DateTime.UtcNow;
                donation.Payment.CanceledAt = paymentResponse.CanceledAt;
                donation.Payment.ExpiredAt = paymentResponse.ExpiredAt;
                donation.Payment.FailedAt = paymentResponse.FailedAt;
                donation.Payment.PaidAt = paymentResponse.PaidAt;

                _websiteDbContext.SaveChanges();
            }

            PurgeExpired();
        }
    }
}
