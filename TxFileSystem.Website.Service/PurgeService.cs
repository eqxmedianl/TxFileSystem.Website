/**
 * 
 * Redistribution and use in source and binary forms, with or without modification, are permitted 
 * provided that the conditions mentioned in the shipped license are met.
 * 
 * Copyright (c) 2021, EQX Media B.V. - All rights reserved.
 * 
 */
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
