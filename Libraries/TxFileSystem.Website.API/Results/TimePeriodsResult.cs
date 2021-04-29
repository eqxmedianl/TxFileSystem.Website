namespace TxFileSystem.Website.API.Results
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using TxFileSystem.Website.API.DTO.Out;

    public sealed class TimePeriodsResult : IActionResult
    {
        public TimePeriodsResult(IEnumerable<TimePeriodDTO> timePeriods)
        {
            this.TimePeriods = timePeriods;
        }

        [JsonProperty("timePeriods")]
        public IEnumerable<TimePeriodDTO> TimePeriods { get; }

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
