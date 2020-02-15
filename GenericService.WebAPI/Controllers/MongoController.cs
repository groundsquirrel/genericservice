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

        public MongoController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Mongo
        [HttpGet]
        public ContentResult Get()
        {
            var result = unitOfWork.Docs.Get();
            var finalResult = result.ToJson(new JsonWriterSettings { OutputMode = JsonOutputMode.Strict });
            return Content(finalResult, "application/json");
        }

        // GET: api/Mongo/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Mongo
        [HttpPost]
        public void Post([FromBody] string value)
        {
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
