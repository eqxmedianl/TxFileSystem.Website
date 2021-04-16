namespace TxFileSystem.Website.Service
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Threading;
    using TxFileSystem.Website.Database;
    using TxFileSystem.Website.Repositories;

    internal sealed class PurgeService
    {
        private const int PurgeIntervalMins = 5;

        private readonly DonationsRepository _donationsRepository;
        private DateTime? _lastPurgedAt;

        public PurgeService()
        {
            var dbContextOptions = new DbContextOptions<WebsiteDbContext>();
            var websiteDbContext = new WebsiteDbContext(dbContextOptions);

            _donationsRepository = new DonationsRepository(websiteDbContext);
        }

        public void Run()
        {
            var cancellationTokenSource = new CancellationTokenSource();
            do
            {
                if (!_lastPurgedAt.HasValue || DateTime.Now.Subtract(_lastPurgedAt.Value).TotalMinutes >= PurgeIntervalMins)
                {
                    _donationsRepository.PurgeExpired();
                    _lastPurgedAt = DateTime.Now;
                }

                Thread.Sleep(500);
            }
            while (!cancellationTokenSource.IsCancellationRequested);
        }
    }
}
