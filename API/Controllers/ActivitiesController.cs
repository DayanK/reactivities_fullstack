using System;
using System.Collections.Generic;
using Domain;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Application.Activities;
using API.Filters;
using System.Threading;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivitiy(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Activity = activity }));
        }

        [HttpDelete("{id}")]
        [TypeFilter(typeof(HandleDeleteExceptionsFilterAttribute))]
        public async Task<IActionResult> DeleteActivity(Guid id)

        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
