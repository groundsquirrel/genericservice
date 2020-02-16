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
            var result = unitOfWork.Docs.Get();
            return ConvertToJson(result);
        }

        private ContentResult ConvertToJson(IEnumerable<BsonDocument> result)
        {
            var finalResult = result.ToJson(writerSettings);
            return Content(finalResult, "application/json");
        }

        // GET: api/Mongo/5e3d20279aa6ca09b88e95c4
        [HttpGet("{id}", Name = "Get")]
        public ContentResult Get(string id)
        {
            return base.Content(
                unitOfWork.Docs.FindById(id).ToJson(writerSettings), 
                "application/json");
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
