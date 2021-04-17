/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 *
 */
namespace TxFileSystem.Website.API.Results
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;
    using System.Threading.Tasks;

    public sealed class DonationPaymentStatusResult : IActionResult
    {
        public DonationPaymentStatusResult(string paymentId, string status)
        {
            PaymentId = paymentId;
            Status = status;
        }

        [JsonProperty("paymentId")]
        public string PaymentId { get; }

        [JsonProperty("paymentStatus")]
        public string Status { get; }

        public Task ExecuteResultAsync(ActionContext context)
        {
            var result = new ObjectResult(this)
            {
                StatusCode = StatusCodes.Status202Accepted
            };
            return result.ExecuteResultAsync(context);
        }
    }
}
