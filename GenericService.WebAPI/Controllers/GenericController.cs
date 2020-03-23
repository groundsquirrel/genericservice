using System.Linq;
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

            #if DEBUG
                InitializeDemoDBData();
            #endif
        }

        // GET: api/Generic
        [HttpGet]
        public IActionResult Get()
        {
            var result = unitOfWork.Docs.Get();
            return new JsonResult(result);
        }
        
        // GET: api/Generic/5e3d20279aa6ca09b88e95c4
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(string id)
        {
            JObject value = unitOfWork.Docs.FindById(id);
            if (value == null) return NotFound();
            return new JsonResult(value);
        }

        // POST: api/Generic
        [HttpPost]
        public IActionResult Post([FromBody] JObject value)
        {
            if (ModelState.IsValid && value != null)
            {
                return Ok(unitOfWork.Docs.Create(value));
            }
            return BadRequest(ModelState);
        }

        // PUT: api/Generic/5e3d20279aa6ca09b88e95c4
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] JObject value)
        {
            if (ModelState.IsValid && !string.IsNullOrEmpty(id))
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

        private void InitializeDemoDBData()
        {
            if (unitOfWork.Docs.Get().Count() == 0)
            {
                unitOfWork.Docs.Create(JObject.Parse("{\"_id\":{\"$oid\":\"5e67adff3fe09a33c042d776\"},\"number\":\"68250927\",\"model\":\"12-4106\",\"countryOwner\":\"РОССИЯ\",\"vagonType\":{\"$numberInt\":\"3\"},\"rentalEndDate\":\"2023-01-30T21:00:00Z\",\"isClosedFloor\":null,\"capacity\":{\"$numberInt\":\"70\"},\"tare\":{\"$numberDouble\":\"23.6\"},\"ownType\":{\"$numberInt\":\"2\"},\"axlesCount\":{\"$numberInt\":\"4\"},\"volume\":{\"$numberInt\":\"78\"},\"length\":{\"$numberDouble\":\"13.92\"},\"ownerName\":\"ООО \\\"ЙЦУКЕН Транс\\\"\",\"tenantName\":\"Акционерное общество \\\"ФЫВАП\\\"\",\"operatorName\":null,\"mileage\":{\"$numberInt\":\"61923\"},\"productionYear\":{\"$numberInt\":\"2010\"},\"lastRepairDate\":\"2019-11-13T21:00:00Z\",\"nextRepairDate\":\"2022-03-28T21:00:00Z\",\"imgUrl\":\"http://dvmash.biz/images/stories/poluvagoni/12-4106_ft.jpg\",\"createdAt\":\"2020-03-10T15:10:55.034Z\",\"updatedAt\":\"2020-03-22T20:52:53.121Z\"}"));
                unitOfWork.Docs.Create(JObject.Parse("{\"_id\":{\"$oid\":\"5e67ec051ca08823e06b5f5c\"},\"number\":\"61589867\",\"model\":\"12-9837\",\"countryOwner\":\"РОССИЯ\",\"vagonType\":{\"$numberInt\":\"3\"},\"rentalEndDate\":\"2022-12-21T21:00:00Z\",\"isClosedFloor\":null,\"capacity\":{\"$numberInt\":\"70\"},\"tare\":{\"$numberInt\":\"24\"},\"ownType\":{\"$numberInt\":\"1\"},\"axlesCount\":{\"$numberInt\":\"4\"},\"volume\":{\"$numberInt\":\"85\"},\"length\":{\"$numberDouble\":\"13.92\"},\"ownerName\":\"Акционерное общество \\\"ЯЧС-лизинг\\\"\",\"tenantName\":\"ООО \\\"РОГА И КОПЫТА\\\"\",\"operatorName\":null,\"mileage\":{\"$numberInt\":\"54873\"},\"productionYear\":{\"$numberInt\":\"2013\"},\"lastRepairDate\":\"2020-02-27T21:00:00Z\",\"nextRepairDate\":\"2022-02-21T21:00:00Z\",\"imgUrl\":\"http://transal.org/wp-content/uploads/2015/12/dsc_0141_1024x768.jpg\",\"createdAt\":\"2020-03-10T19:35:33.106Z\",\"updatedAt\":\"2020-03-22T20:53:39.048Z\"}"));
                unitOfWork.Docs.Create(JObject.Parse("{\"_id\":{\"$oid\":\"5e67f1ed2e106e15ccafbbd1\"},\"number\":\"68047372\",\"model\":\"12-9869\",\"countryOwner\":\"РОССИЯ\",\"vagonType\":{\"$numberInt\":\"4\"},\"rentalEndDate\":\"2024-05-19T21:00:00Z\",\"isClosedFloor\":true,\"capacity\":{\"$numberInt\":\"77\"},\"tare\":{\"$numberDouble\":\"22.5\"},\"ownType\":{\"$numberInt\":\"1\"},\"axlesCount\":{\"$numberInt\":\"4\"},\"volume\":{\"$numberInt\":\"92\"},\"length\":{\"$numberDouble\":\"13.92\"},\"ownerName\":\"Акционерное общество \\\"Вагон Лизинг\\\"\",\"tenantName\":\"Акционерное общество \\\"ФЫВАП\\\"\",\"operatorName\":null,\"mileage\":{\"$numberInt\":\"742044\"},\"productionYear\":{\"$numberInt\":\"2014\"},\"lastRepairDate\":\"2020-02-19T21:00:00Z\",\"nextRepairDate\":\"2022-12-23T21:00:00Z\",\"imgUrl\":\"https://vgudok.com/sites/default/files/field/image/poluvagon_uvz.jpg\",\"createdAt\":\"2020-03-10T20:00:45.218Z\",\"updatedAt\":\"2020-03-22T20:56:43.268Z\"}"));
                unitOfWork.Docs.Create(JObject.Parse("{\"_id\":{\"$oid\":\"5e68fb567e43af3ec4940a6f\"},\"number\":\"50041797\",\"model\":\"12-4106\",\"countryOwner\":\"РОССИЯ\",\"vagonType\":{\"$numberInt\":\"3\"},\"rentalEndDate\":\"2023-01-30T21:00:00Z\",\"isClosedFloor\":null,\"capacity\":{\"$numberInt\":\"70\"},\"tare\":{\"$numberDouble\":\"23.6\"},\"ownType\":{\"$numberInt\":\"1\"},\"axlesCount\":{\"$numberInt\":\"4\"},\"volume\":{\"$numberInt\":\"78\"},\"length\":{\"$numberDouble\":\"13.92\"},\"ownerName\":\"ООО \\\"Контора №1\\\"\",\"tenantName\":\"Акционерное общество \\\"ФЫВАП\\\"\",\"operatorName\":null,\"mileage\":{\"$numberInt\":\"61923\"},\"productionYear\":{\"$numberInt\":\"2010\"},\"lastRepairDate\":\"2019-11-13T21:00:00Z\",\"nextRepairDate\":\"2022-03-28T21:00:00Z\",\"imgUrl\":\"http://dvmash.biz/images/stories/poluvagoni/12-4106_ft.jpg\",\"createdAt\":\"2020-03-11T14:53:10.8Z\",\"updatedAt\":\"2020-03-22T20:57:52.055Z\"}"));
            }
        }
    }
}
