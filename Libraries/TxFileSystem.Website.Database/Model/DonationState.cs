/**
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the conditions mentioned in the shipped license are met.
 *
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 *
 */
namespace TxFileSystem.Website.Database.Model
{
    using DonationStateEnum = Enums.DonationState;

    public class DonationState
    {
        public DonationStateEnum DonationStateId { get; set; }

        public string Description { get; set; }
    }
}
