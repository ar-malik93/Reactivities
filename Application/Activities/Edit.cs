using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }
        public class Hander : IRequestHandler<Command, Result<Unit>>
        {
            DataContext _context;
            IMapper _mapper;
            public Hander(DataContext context, IMapper mapper)
            {
                _context= context;
                _mapper = mapper;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);
                if (activity == null) { return null; }

                _mapper.Map(request.Activity, activity);

                var result = await _context.SaveChangesAsync() >0;

                if (!result) { return  Result<Unit>.Failure("Activty failed to update"); }
                else { return Result<Unit>.Success(Unit.Value); }

            }
        }
    }
}
