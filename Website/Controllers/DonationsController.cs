/**
 * 
 * Redistribution and use in source and binary forms, with or without modification, are permitted 
 * provided that the conditions mentioned in the shipped license are met.
 * 
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 * 
 */
namespace TxFileSystem.Website.Controllers
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Infrastructure;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;
    using Mollie.Api.Client;
    using Mollie.Api.Models;
    using Mollie.Api.Models.Payment;
    using Mollie.Api.Models.Payment.Request;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using TxFileSystem.Website.API.DTO;
    using TxFileSystem.Website.API.Results;
    using TxFileSystem.Website.Database;
    using TxFileSystem.Website.Database.Model;
    using TxFileSystem.Website.Repositories;
    using TxFileSystem.Website.Settings.Mollie;

    using Currency = Mollie.Api.Models.Currency;

    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    public class DonationsController : ControllerBase
    {
        private readonly ILogger<DonationsController> _logger;
        private readonly IActionContextAccessor _accessor;
        private readonly IOptions<Mollie> _mollieOptions;
        private readonly WebsiteDbContext _websiteDbContext;
        private readonly DonationsRepository _donationsRepository;

        public DonationsController(ILogger<DonationsController> logger,
            IOptions<Mollie> mollieOptions,
            IActionContextAccessor accessor,
            WebsiteDbContext websiteDbContext)
        {
            _logger = logger;
            _mollieOptions = mollieOptions;
            _accessor = accessor;
            _websiteDbContext = websiteDbContext;

            _donationsRepository = new DonationsRepository(_websiteDbContext);
        }

        [HttpPost]
        [Route("donate")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DonationPendingResult))]
        public async Task<IActionResult> DonateAsync([FromBody] DonationDTO donation)
        {
            var refererUri = new Uri(_accessor.ActionContext.HttpContext.Request.Headers["Referer"]);

            var paymentRequest = new PaymentRequest()
            {
                Amount = new Amount(Currency.EUR, new decimal(donation.Amount)),
                Description = "Donation for EQXMedia.TxFileSystem",
                RedirectUrl = refererUri.AbsoluteUri,
                Methods = new List<string>() {
                    PaymentMethod.Ideal,
                    PaymentMethod.CreditCard,
                    PaymentMethod.PayPal
                }
            };
            var paymentClient = new PaymentClient(_mollieOptions.Value.Api.Key);
            var paymentResponse = await paymentClient.CreatePaymentAsync(paymentRequest, includeQrCode: true);

            Donor donor = null;
            if (!donation.IsAnonymous && donation.Donor.IsValid
                && !_donationsRepository.TryGetDonor(donation.Donor.Email, out donor))
            {
                _donationsRepository.Add(new Donor()
                {
                    Email = donation.Donor.Email,
                    Name = donation.Donor.Name,
                    Url = donation.Donor.Url
                });
                _donationsRepository.TryGetDonor(donation.Donor.Email, out donor);
            }

            _donationsRepository.Add(paymentResponse.Id, donation.Uuid, donation.Amount,
                paymentResponse.CreatedAt, paymentResponse.ExpiresAt, donor);

            _logger.LogInformation("Created payment request using Mollie for {uuid}.", donation.Uuid);

            return new DonationPendingResult(paymentResponse.Id, paymentResponse.Links.Checkout.Href);
        }

        [HttpGet]
        [Route("donors/{year}/{month}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DonorsResult))]
        public IActionResult GetDonors(int year, int month)
        {
            var donors = _donationsRepository.GetDonors(month, year)
                .Select(d => new API.DTO.Out.DonorDTO()
            {
                Name = d.Name,
                Url = d.Url
            });

            _logger.LogInformation("Retrieved the donors");

            return new DonorsResult(donors);
        }

        [HttpPost]
        [Route("state")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DonationPaymentStatusResult))]
        public async Task<IActionResult> GetStateAsync([FromBody] PaymentDTO payment)
        {
            var paymentClient = new PaymentClient(_mollieOptions.Value.Api.Key);
            var paymentResponse = await paymentClient.GetPaymentAsync(payment.TransactionId);

            _donationsRepository.UpdateState(paymentResponse);

            _logger.LogInformation("Update payment status obtained from Mollie for {paymentId}.", payment.TransactionId);

            return new DonationPaymentStatusResult(payment.TransactionId, paymentResponse.Status);
        }

        [HttpGet]
        [Route("timeperiods")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(TimePeriodsResult))]
        public IActionResult GetTimePeriods()
        {
            var timePeriods = _websiteDbContext.Donations
                .Where(d => d.Donor != null && d.Payment.PaidAt.HasValue)
                .Select(d => d.Payment.PaidAt.Value)
                .GroupBy(d => new { Month = d.Month, Year = d.Year })
                .OrderByDescending(d => d.Key.Month)
                .Select(g => new API.DTO.Out.TimePeriodDTO()
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month
                }).ToList();

            _logger.LogInformation("Retrieved the donors");

            return new TimePeriodsResult(timePeriods);
        }
    }
}
