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

    public sealed class DonationDTO
    {
        public DonationDTO()
        {
            this.Donor = new DonorDTO();
        }

        [JsonProperty(PropertyName = "amount")]
        public double Amount { get; set; }

        [JsonProperty(PropertyName = "uuid")]
        public string Uuid { get; set; }

        [JsonProperty(PropertyName = "donor")]
        public DonorDTO Donor { get; set; }
    }
}