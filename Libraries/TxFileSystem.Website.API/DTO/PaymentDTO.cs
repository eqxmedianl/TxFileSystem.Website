/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 *
 */
namespace TxFileSystem.Website.API.DTO
{
    using Newtonsoft.Json;

    public sealed class PaymentDTO
    {
        [JsonProperty("transactionId")]
        public string TransactionId { get; set; }
    }
}
