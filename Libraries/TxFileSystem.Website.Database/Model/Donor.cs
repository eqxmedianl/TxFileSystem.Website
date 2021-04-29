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
    using System.ComponentModel.DataAnnotations;

    public sealed class Donor
    {
        [Key]
        public long Id{ get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Url { get; set; }

        [Required]
        public string Email { get; set; }
    }
}