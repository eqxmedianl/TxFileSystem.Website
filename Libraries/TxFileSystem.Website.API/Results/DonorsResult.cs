namespace TxFileSystem.Website.API.Results
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using TxFileSystem.Website.API.DTO.Out;

    public sealed class DonorsResult : IActionResult
    {
        public DonorsResult(IEnumerable<DonorDTO> donors)
        {
            this.Donors = donors;
        }

        public IEnumerable<DonorDTO> Donors { get; }

        public Task ExecuteResultAsync(ActionContext context)
        {
            var result = new ObjectResult(this)
            {
                StatusCode = StatusCodes.Status200OK
            };
            return result.ExecuteResultAsync(context);
        }
    }
}
