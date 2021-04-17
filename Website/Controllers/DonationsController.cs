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
        private readonly DonationsRepository _donationsRepository;

        public DonationsController(ILogger<DonationsController> logger,
            IOptions<Mollie> mollieOptions,
            IActionContextAccessor accessor,
            WebsiteDbContext websiteDbContext)
        {
            _logger = logger;
            _mollieOptions = mollieOptions;
            _accessor = accessor;

            _donationsRepository = new DonationsRepository(websiteDbContext);
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

            Donor donor;
            if (!_donationsRepository.TryGetDonor(donation.Donor.Email, out donor) && donation.Donor.IsValid)
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
    }
}
