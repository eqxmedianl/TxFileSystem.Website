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
    using CurrencyEnum = Enums.Currency;

    public class Currency
    {
        public CurrencyEnum CurrencyId { get; set; }

        public string Code { get; set; }
    }
}
