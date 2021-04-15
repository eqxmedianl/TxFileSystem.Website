namespace TxFileSystem.Website.Database.Model
{
    using System.ComponentModel.DataAnnotations;

    public class Donation
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        public Currency Currency { get; set; }

        [Required]
        public DonationState State { get; set; }

        public string PaymentId { get; set; }

        public string Uuid { get; internal set; }
    }
}