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
    using System;
    using System.ComponentModel.DataAnnotations;

    public class MolliePayment
    {
        private DateTime? _canceledAt;
        private DateTime? _createdAt;
        private DateTime? _expiresAt;
        private DateTime? _expiredAt;
        private DateTime? _failedAt;
        private DateTime? _paidAt;

        public MolliePayment(string transactionId, DateTime? createdAt, DateTime? expiresAt)
        {
            this.PaymentId = transactionId;
            this.CreatedAt = createdAt;
            this.ExpiresAt = expiresAt;
        }
        internal MolliePayment()
        {
        }

        [Key]
        public long Id { get; set; }

        [Required]
        public string PaymentId { get; set; }

        public DateTime? CanceledAt
        {
            get => _canceledAt;
            set
            {
                _canceledAt = (value.HasValue) ? value.Value.ToUniversalTime() : value;
            }
        }

        public DateTime? CreatedAt
        {
            get => _createdAt;
            set
            {
                _createdAt = (value.HasValue) ? value.Value.ToUniversalTime() : value;
            }
        }

        public DateTime? ExpiresAt
        {
            get => _expiresAt;
            set
            {
                _expiresAt = (value.HasValue) ? value.Value.ToUniversalTime() : value;
            }
        }

        public DateTime? ExpiredAt
        {
            get => _expiredAt;
            set
            {
                _expiredAt = (value.HasValue) ? value.Value.ToUniversalTime() : value;
            }
        }

        public DateTime? FailedAt
        {
            get => _failedAt;
            set
            {
                _failedAt = (value.HasValue) ? value.Value.ToUniversalTime() : value;
            }
        }

        public DateTime? PaidAt
        {
            get => _paidAt;
            set
            {
                _paidAt = (value.HasValue) ? value.Value.ToUniversalTime() : value;
            }
        }
    }
}