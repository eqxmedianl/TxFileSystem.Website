namespace TxFileSystem.Website.Database.Model
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class Donation
    {
        public Donation()
        {
            var utcNow = DateTime.UtcNow;

            this.DateAdded = utcNow;
            this.LastUpdated = utcNow;
        }

        [Key]
        public long Id { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        public Currency Currency { get; set; }

        [Required]
        public DonationState State { get; set; }

        [Required]
        public MolliePayment Payment { get; set; }

        public string Uuid { get; set; }

        [Required]
        public DateTime DateAdded { get; set; }

        [Required]
        public DateTime LastUpdated { get; set; }
    }
}