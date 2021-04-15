namespace TxFileSystem.Website.Database
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Linq;
    using TxFileSystem.Website.Database.Model;

    public sealed class WebsiteDbContext : DbContext
    {
        public WebsiteDbContext(DbContextOptions<WebsiteDbContext> options)
               : base(options)
        {
            // FIXME: this should be done this way.
            Database.EnsureCreated();
        }

        public DbSet<Donation> Donations { get; set; }

        public DbSet<DonationState> DonationStates { get; set; }

        public DbSet<Currency> Currencies { get; set; }

        public DbSet<MolliePayment> MolliePayments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            // FIXME: Use MySQL instead eventually
            optionsBuilder.UseSqlite("Data Source=C:\\Temp\\donations.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder
                .Entity<MolliePayment>()
                .HasIndex(p => p.PaymentId)
                .IsUnique(unique: true);

            modelBuilder
                .Entity<Currency>().HasData(
                    Enum.GetValues(typeof(Model.Enums.Currency))
                        .Cast<Model.Enums.Currency>()
                        .Select(c => new Currency()
                        {
                            CurrencyId = c,
                            Code = c.ToString()
                        })
                );

            modelBuilder.Entity<Currency>()
                .HasKey(c => c.CurrencyId);

            modelBuilder
                .Entity<DonationState>().HasData(
                    Enum.GetValues(typeof(Model.Enums.DonationState))
                        .Cast<Model.Enums.DonationState>()
                        .Select(s => new DonationState()
                        {
                            DonationStateId = s,
                            Description = s.ToString()
                        })
                );

            modelBuilder.Entity<DonationState>()
                .HasKey(s => s.DonationStateId);

            modelBuilder
                .Entity<DonationState>()
                .HasIndex(s => s.DonationStateId)
                .IsUnique(unique: true);
        }
    }
}
