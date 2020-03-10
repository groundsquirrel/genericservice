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
                collection.InsertOne(
                    BsonDocument.Parse("{\"_id\":{\"$oid\":\"5e67adff3fe09a33c042d776\"},\"model\":\"12-4106\",\"countryOwner\":\"РОССИЯ\",\"vagonType\":{\"$numberInt\":\"3\"},\"rentalEndDate\":\"2023-01-30T21:00:00Z\",\"isClosedFloor\":null,\"capacity\":{\"$numberInt\":\"70\"},\"tare\":{\"$numberDouble\":\"23.6\"},\"ownType\":{\"$numberInt\":\"1\"},\"axlesCount\":{\"$numberInt\":\"4\"},\"volume\":{\"$numberInt\":\"78\"},\"length\":{\"$numberDouble\":\"13.92\"},\"ownerName\":\"ООО \\\"ВЕСТКОАЛ Транс\\\"\",\"tenantName\":\"Акционерное общество \\\"СУЭК\\\"\",\"operatorName\":null,\"mileage\":{\"$numberInt\":\"61923\"},\"productionYear\":{\"$numberInt\":\"2010\"},\"lastRepairDate\":\"2019-11-13T21:00:00Z\",\"nextRepairDate\":\"2022-03-28T21:00:00Z\",\"imgUrl\":\"http://dvmash.biz/images/stories/poluvagoni/12-4106_ft.jpg\",\"createdAt\":\"2020-03-10T15:10:55.034Z\",\"updatedAt\":\"2020-03-10T15:10:55.034Z\"}")
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