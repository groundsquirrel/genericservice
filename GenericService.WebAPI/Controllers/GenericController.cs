using GenericService.DAL.Services.Abstractions;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace GenericService.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenericController : ControllerBase
    {
        readonly IUnitOfWork unitOfWork;

        public GenericController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Generic
        [HttpGet]
        public JsonResult Get()
        {
            var result = unitOfWork.Docs.Get();
            return new JsonResult(result);
        }
        
        // GET: api/Generic/5e3d20279aa6ca09b88e95c4
        [HttpGet("{id}", Name = "Get")]
        public JsonResult Get(string id)
        {
            return new JsonResult(unitOfWork.Docs.FindById(id));
        }

        // POST: api/Generic
        [HttpPost]
        public IActionResult Post([FromBody] JObject value)
        {
            if (ModelState.IsValid && value != null)
            {
                unitOfWork.Docs.Create(value);
                return Ok(value);
            }
            return BadRequest(ModelState);
        }

        // PUT: api/Generic/5e3d20279aa6ca09b88e95c4
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] JObject value)
        {
            if (ModelState.IsValid && !string.IsNullOrEmpty(id))// && BsonDocument.TryParse(jsonString, out BsonDocument inputValue))
            {
                unitOfWork.Docs.Update(id, value);
                return Ok(value);
            }
            return BadRequest(ModelState);
        }

        // DELETE: api/Generic/5e3d20279aa6ca09b88e95c4
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            if (string.IsNullOrEmpty(id)) return NotFound(id);

            unitOfWork.Docs.Remove(id);
            return Ok();
        }
    }
}
