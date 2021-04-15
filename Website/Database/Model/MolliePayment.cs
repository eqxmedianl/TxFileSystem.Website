namespace TxFileSystem.Website.Database.Model
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class MolliePayment
    {
        public MolliePayment(string transactionId, DateTime? createdAt, DateTime? expiresAt)
        {
            this.PaymentId = transactionId;
            this.CreatedAt = (createdAt.HasValue) ? createdAt.Value.ToUniversalTime() : null;
            this.ExpiresAt = (expiresAt.HasValue) ? expiresAt.Value.ToUniversalTime() : null;
        }

        [Key]
        public long Id { get; set; }

        [Required]
        public string PaymentId { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? ExpiresAt { get; set; }

        public DateTime? ExpiredAt { get; set; }

        public DateTime? PaidAt { get; set; }
    }
}