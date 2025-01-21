using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Persistence;
using System.Linq;
using Microsoft.AspNetCore.Http; 


namespace API.Filters
{
    public class HandleDeleteExceptionsFilterAttribute : ExceptionFilterAttribute
    {
        private readonly DataContext _context;

        public HandleDeleteExceptionsFilterAttribute(DataContext context)
        {
            _context = context;
        }

        public override void OnException(ExceptionContext context)
        {
            base.OnException(context);

            var strActivityId = context.RouteData.Values["id"] as string;

            if (Guid.TryParse(strActivityId, out Guid activityId))
            {
                if (_context.Activities.FirstOrDefault(x => x.Id == activityId) == null)
                {
                    context.ModelState.AddModelError("ActivityId", "Activity doesn't exist anymore.");
                    var problemDetails = new ValidationProblemDetails(context.ModelState)
                    {
                        Status = StatusCodes.Status404NotFound
                    };

                    context.Result = new NotFoundObjectResult(problemDetails);
                }
            }
        }
    }
}
