using System;
using System.Collections.Generic;
using System.Linq;
using GenericService.DAL.Services.Abstractions;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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
        public JsonResult Get()
        {
            var result = unitOfWork.Docs.Get();
            return new JsonResult(result);
        }
        
        // GET: api/Mongo/5e3d20279aa6ca09b88e95c4
        [HttpGet("{id}", Name = "Get")]
        public JsonResult Get(string id)
        {
            return new JsonResult(unitOfWork.Docs.FindById(id));
        }

        // POST: api/Mongo
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

        // PUT: api/Mongo/5
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

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
        }
    }
}
