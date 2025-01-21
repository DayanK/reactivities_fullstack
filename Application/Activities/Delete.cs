using MediatR;
using Persistence;
using System.Threading.Tasks;
using System.Threading;
using System;

namespace Application.Activities
{
    public class Delete
    {
         public class Command : IRequest
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id); 
                if (activity == null)
                {
                    throw new Exception("Activity not found.");
                } 
                _context.Activities.Remove(activity);

                try
                {
                    await _context.SaveChangesAsync(cancellationToken);
                }
                catch (Exception ex)
                {
                    throw new Exception("Problem saving changes to the database.", ex);
                }
                return Unit.Value;
            }
        }

    }
}