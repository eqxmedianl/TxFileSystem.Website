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
    using TxFileSystem.Website.Database;
    using TxFileSystem.Website.Model;
    using TxFileSystem.Website.Repositories;
    using TxFileSystem.Website.Settings;

    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    public class DonationsController : ControllerBase
    {
        private readonly ILogger<DonationsController> _logger;
        private readonly IActionContextAccessor _accessor;
        private readonly IOptions<PaymentServiceProvider> _paymentServiceProviderOptions;
        private readonly DonationsRepository _donationsRepository;

        public DonationsController(ILogger<DonationsController> logger,
            IOptions<PaymentServiceProvider> paymentServiceProviderOptions,
            IActionContextAccessor accessor,
            WebsiteDbContext websiteDbContext)
        {
            _logger = logger;
            _paymentServiceProviderOptions = paymentServiceProviderOptions;
            _accessor = accessor;

            _donationsRepository = new DonationsRepository(websiteDbContext);
        }

        [HttpPost]
        [Route("donate")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DonationPendingResult))]
        public async Task<IActionResult> DonateAsync([FromBody] Donation donation)
        {
            var serverAddress = _accessor.ActionContext.HttpContext.Request.Scheme + "://" +
                _accessor.ActionContext.HttpContext.Request.Host;
            var paymentRequest = new PaymentRequest()
            {
                Amount = new Amount(Currency.EUR, new Decimal(donation.Amount)),
                Description = "Donation for EQXMedia.TxFileSystem",
                RedirectUrl = serverAddress + "/donate",
                Methods = new List<string>() {
                    PaymentMethod.Ideal,
                    PaymentMethod.CreditCard,
                    PaymentMethod.PayPal
                }
            };
            var paymentClient = new PaymentClient(_paymentServiceProviderOptions.Value.Mollie.Api.Key);
            var paymentResponse = await paymentClient.CreatePaymentAsync(paymentRequest, includeQrCode: true);

            _donationsRepository.Add(paymentResponse.Id, donation.Uuid, donation.Amount);

            _logger.LogInformation("Created payment request using Mollie for {uuid}.", donation.Uuid);

            return new DonationPendingResult(paymentResponse.Id, paymentResponse.Links.Checkout.Href);
        }

        [HttpPost]
        [Route("state")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DonationPaymentStatusResult))]
        public async Task<IActionResult> GetStateAsync([FromBody] Payment payment)
        {
            var paymentClient = new PaymentClient(_paymentServiceProviderOptions.Value.Mollie.Api.Key);
            var paymentResponse = await paymentClient.GetPaymentAsync(payment.TransactionId);

            _donationsRepository.UpdateState(paymentResponse.Id, paymentResponse.Status);

            _logger.LogInformation("Update payment status obtained from Mollie for {paymentId}.", payment.TransactionId);

            return new DonationPaymentStatusResult(payment.TransactionId, paymentResponse.Status);
        }
    }
}
