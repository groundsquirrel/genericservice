using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using GenericService.DAL.Services.Abstractions;
using Newtonsoft.Json.Linq;
using System.Linq;
using MongoDB.Bson.IO;
using Newtonsoft.Json;

namespace GenericService.DAL.Services
{
    public class BsonDocumentRepository : GenericMongoRepository<BsonDocument, string, JObject>
    {
        JsonWriterSettings writerSettings = new JsonWriterSettings { OutputMode = JsonOutputMode.Strict };
        
        public BsonDocumentRepository(IMongoDbContext mongoDbContext, string collectionName) : base(mongoDbContext, collectionName)
        {
            if (!collection.Find(new BsonDocument()).Any())
                collection.InsertMany(
                    new List<BsonDocument> {
                        BsonDocument.Parse("{\"_id\":{\"$oid\":\"5e67adff3fe09a33c042d776\"},\"number\":\"68250927\",\"model\":\"12-4106\",\"countryOwner\":\"РОССИЯ\",\"vagonType\":{\"$numberInt\":\"3\"},\"rentalEndDate\":\"2023-01-30T21:00:00Z\",\"isClosedFloor\":null,\"capacity\":{\"$numberInt\":\"70\"},\"tare\":{\"$numberDouble\":\"23.6\"},\"ownType\":{\"$numberInt\":\"1\"},\"axlesCount\":{\"$numberInt\":\"4\"},\"volume\":{\"$numberInt\":\"78\"},\"length\":{\"$numberDouble\":\"13.92\"},\"ownerName\":\"ООО \\\"ВЕСТКОАЛ Транс\\\"\",\"tenantName\":\"Акционерное общество \\\"СУЭК\\\"\",\"operatorName\":null,\"mileage\":{\"$numberInt\":\"61923\"},\"productionYear\":{\"$numberInt\":\"2010\"},\"lastRepairDate\":\"2019-11-13T21:00:00Z\",\"nextRepairDate\":\"2022-03-28T21:00:00Z\",\"imgUrl\":\"http://dvmash.biz/images/stories/poluvagoni/12-4106_ft.jpg\",\"createdAt\":\"2020-03-10T15:10:55.034Z\",\"updatedAt\":\"2020-03-10T15:10:55.034Z\"}"),
                        BsonDocument.Parse("{\"_id\":{\"$oid\":\"5e67ec051ca08823e06b5f5c\"},\"number\":\"61589867\",\"model\":\"12-9837\",\"countryOwner\":\"РОССИЯ\",\"vagonType\":{\"$numberInt\":\"3\"},\"rentalEndDate\":\"2022-12-21T21:00:00Z\",\"isClosedFloor\":null,\"capacity\":{\"$numberInt\":\"70\"},\"tare\":{\"$numberInt\":\"24\"},\"ownType\":{\"$numberInt\":\"1\"},\"axlesCount\":{\"$numberInt\":\"4\"},\"volume\":{\"$numberInt\":\"85\"},\"length\":{\"$numberDouble\":\"13.92\"},\"ownerName\":\"Акционерное общество \\\"ВЭБ-лизинг\\\"\",\"tenantName\":\"ООО \\\"КВАТРО ПЛ ЛОГИСТИКА\\\"\",\"operatorName\":null,\"mileage\":{\"$numberInt\":\"54873\"},\"productionYear\":{\"$numberInt\":\"2013\"},\"lastRepairDate\":\"2020-02-27T21:00:00Z\",\"nextRepairDate\":\"2022-02-21T21:00:00Z\",\"imgUrl\":\"http://transal.org/wp-content/uploads/2015/12/dsc_0141_1024x768.jpg\",\"createdAt\":\"2020-03-10T19:35:33.106Z\",\"updatedAt\":\"2020-03-10T19:35:33.106Z\"}"),
                        BsonDocument.Parse("{\"_id\":{\"$oid\":\"5e67f1ed2e106e15ccafbbd1\"},\"number\":\"68047372\",\"model\":\"12-9869\",\"countryOwner\":\"РОССИЯ\",\"vagonType\":{\"$numberInt\":\"4\"},\"rentalEndDate\":\"2024-05-19T21:00:00Z\",\"isClosedFloor\":true,\"capacity\":{\"$numberInt\":\"77\"},\"tare\":{\"$numberDouble\":\"22.5\"},\"ownType\":{\"$numberInt\":\"1\"},\"axlesCount\":{\"$numberInt\":\"4\"},\"volume\":{\"$numberInt\":\"92\"},\"length\":{\"$numberDouble\":\"13.92\"},\"ownerName\":\"Акционерное общество \\\"Сбербанк Лизинг\\\"\",\"tenantName\":\"Акционерное общество \\\"СУЭК\\\"\",\"operatorName\":null,\"mileage\":{\"$numberInt\":\"742044\"},\"productionYear\":{\"$numberInt\":\"2014\"},\"lastRepairDate\":\"2020-02-19T21:00:00Z\",\"nextRepairDate\":\"2022-12-23T21:00:00Z\",\"imgUrl\":\"https://vgudok.com/sites/default/files/field/image/poluvagon_uvz.jpg\",\"createdAt\":\"2020-03-10T20:00:45.218Z\",\"updatedAt\":\"2020-03-10T20:00:45.218Z\"}"),
                        BsonDocument.Parse("{\"_id\":{\"$oid\":\"5e68fb567e43af3ec4940a6f\"},\"number\":\"50041797\",\"model\":\"12-4106\",\"countryOwner\":\"РОССИЯ\",\"vagonType\":{\"$numberInt\":\"3\"},\"rentalEndDate\":\"2023-01-30T21:00:00Z\",\"isClosedFloor\":null,\"capacity\":{\"$numberInt\":\"70\"},\"tare\":{\"$numberDouble\":\"23.6\"},\"ownType\":{\"$numberInt\":\"1\"},\"axlesCount\":{\"$numberInt\":\"4\"},\"volume\":{\"$numberInt\":\"78\"},\"length\":{\"$numberDouble\":\"13.92\"},\"ownerName\":\"ООО \\\"ВЕСТКОАЛ Транс\\\"\",\"tenantName\":\"Акционерное общество \\\"СУЭК\\\"\",\"operatorName\":null,\"mileage\":{\"$numberInt\":\"61923\"},\"productionYear\":{\"$numberInt\":\"2010\"},\"lastRepairDate\":\"2019-11-13T21:00:00Z\",\"nextRepairDate\":\"2022-03-28T21:00:00Z\",\"imgUrl\":\"http://dvmash.biz/images/stories/poluvagoni/12-4106_ft.jpg\",\"createdAt\":\"2020-03-11T14:53:10.8Z\",\"updatedAt\":\"2020-03-11T14:53:10.8Z\"}")
                    }
                );
        }

        public override JObject Create(JObject item)
        {
            BsonDocument document = BsonDocument.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(item));
            if (!document.Any(a => a.Name == "_id"))
                document.InsertAt(0, new BsonElement("_id", ObjectId.GenerateNewId()));

            collection.InsertOne(document);
            
            return JObject.Parse(document.ToJson(writerSettings));
        }

        public override IEnumerable<JObject> Get()
        {
            return this.Get(new BsonDocument());
        }

        public override IEnumerable<JObject> Get(BsonDocument filter)
        {
            return collection.Find(filter).ToEnumerable().Select(s => JObject.Parse(s.ToJson(writerSettings)));          
        }

        public override JObject FindById(string id)
        {
            if (GetElementById(id) is BsonDocument document)
                return JObject.Parse(document.ToJson(writerSettings));
            else
                return null;
        }

        public override void Remove(string item)
        {
            if (GetElementById(item) is BsonDocument document)
                collection.DeleteOne(document);
        }

        public override void Update(string filter, JObject item)
        {
            if (GetElementById(filter) is BsonDocument source)
            {
                BsonDocument dest = BsonDocument.Parse(item.ToString(Formatting.None));
                collection.ReplaceOne(source, dest);
            }
        }

        private BsonDocument GetElementById(string item)
        {
            return (ObjectId.TryParse(item, out ObjectId objectId)) ? 
                collection.Find(new BsonDocument { { "_id", objectId } }).FirstOrDefault() :
                null;
        }
    }
}