namespace TxFileSystem.Website.Database.Model
{
    using DonationStateEnum = Enums.DonationState;

    public class DonationState
    {
        public DonationStateEnum DonationStateId { get; set; }

        public string Description { get; set; }
    }
}
