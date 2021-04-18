/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 *
 */
namespace TxFileSystem.Website.Repositories
{
    using Microsoft.EntityFrameworkCore;
    using Mollie.Api.Models.Payment.Response;
    using System;
    using System.Collections.Generic;
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

        public void Add(string paymentId, string uuid, double amount, DateTime? createdAt, DateTime? expiresAt, Donor donor)
        {
            var currency = _websiteDbContext.Currencies.First(c => c.CurrencyId == CurrencyEnum.EUR);
            var donationState = _websiteDbContext.DonationStates.First(s => s.DonationStateId == DonationStateEnum.Pending);

            _websiteDbContext.Donations.Add(new Donation()
            {
                Amount = amount,
                Currency = currency,
                State = donationState,
                Uuid = uuid,
                Payment = new MolliePayment(paymentId, createdAt, expiresAt),
                Donor = donor
            });

            _websiteDbContext.SaveChanges();
        }

        public void PurgeExpired()
        {
            // FIXME: Update the state of the donations using the Mollie API before purging actually expired payments.

            var now = DateTime.UtcNow;

            var expiredDonations = _websiteDbContext.Donations
                .Include(d => d.Payment)
                .Where(d => d.Payment.ExpiresAt <= now && !d.Payment.PaidAt.HasValue)
                .ToList();

            var expiredPayments = expiredDonations.Select(d => d.Payment)
                .ToList();

            _websiteDbContext.Donations.RemoveRange(expiredDonations);
            _websiteDbContext.MolliePayments.RemoveRange(expiredPayments);

            _websiteDbContext.SaveChanges();
        }

        public void Add(Donor donor)
        {
            _websiteDbContext.Donors.Add(donor);
            _websiteDbContext.SaveChanges();
        }

        public IEnumerable<Donor> GetDonors(int start = 0, int limit = 100)
        {
            return _websiteDbContext.Donors
                .OrderByDescending(d => d.Id)
                .Skip(start)
                .Take(limit)
                .AsEnumerable();
        }

        public bool TryGetDonor(string email, out Donor donor)
        {
            donor = null;

            donor = _websiteDbContext.Donors.FirstOrDefault(d => d.Email == email);

            return (donor != null);
        }

        public void UpdateState(PaymentResponse paymentResponse)
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
        }
    }
}
