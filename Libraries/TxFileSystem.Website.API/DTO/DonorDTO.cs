﻿/**
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

    public sealed class DonorDTO
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "donor")]
        public string Url { get; set; }

        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }

        public bool IsValid => (!string.IsNullOrWhiteSpace(this.Name) && !string.IsNullOrWhiteSpace(this.Url)
            && !string.IsNullOrWhiteSpace(this.Email));
    }
}