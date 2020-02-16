using System.Collections.Generic;
using GenericService.DAL.Services.Abstractions;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.IO;

namespace GenericService.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MongoController : ControllerBase
    {
        readonly IUnitOfWork unitOfWork;
        JsonWriterSettings writerSettings = new JsonWriterSettings { OutputMode = JsonOutputMode.Strict };

        public MongoController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Mongo
        [HttpGet]
        public ContentResult Get()
        {
            var result = unitOfWork.Docs.Get().ToJson(writerSettings);
            return Content(result);
        }

        public override ContentResult Content(string result)
        {
            return Content(result, "application/json");
        }

        // GET: api/Mongo/5e3d20279aa6ca09b88e95c4
        [HttpGet("{id}", Name = "Get")]
        public ContentResult Get(string id)
        {
            return Content(unitOfWork.Docs.FindById(id).ToJson(writerSettings));
        }

        // POST: api/Mongo
        [HttpPost]
        public IActionResult Post([FromBody] object value)
        {
            if (ModelState.IsValid && value != null)
            {
                unitOfWork.Docs.Create(BsonDocument.Parse(value.ToString()));
                return Ok(value);
            }
            return BadRequest(ModelState);
        }

        // PUT: api/Mongo/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
