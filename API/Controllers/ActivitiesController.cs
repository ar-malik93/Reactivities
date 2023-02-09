using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : BaseApiController
    {
        // GET: api/<ActivitiesController>
        [HttpGet]
        public async Task<ActionResult<IList<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        // GET api/<ActivitiesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        // POST api/<ActivitiesController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        // PUT api/<ActivitiesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] Activity activity)
        {
            activity.Id = id;
            return Ok(Mediator.Send(new Edit.Command { Activity = activity }));
        }

        // DELETE api/<ActivitiesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
