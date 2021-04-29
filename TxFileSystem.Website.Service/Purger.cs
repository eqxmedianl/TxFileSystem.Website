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
    static class Purger
    {
        static void Main(string[] args)
        {
            var purgeService = new PurgeService();
            purgeService.Run();
        }
    }
}
