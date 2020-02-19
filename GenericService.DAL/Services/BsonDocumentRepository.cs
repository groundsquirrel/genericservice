using System;
using System.Collections.Generic;
using System.Linq.Expressions;
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
        }

        public override void Create(JObject item)
        {
            collection.InsertOne(BsonDocument.Parse(item.ToString()));
        }

        public override IEnumerable<JObject> Get()
        {
            return collection.Find(Builders<BsonDocument>.Filter.Empty).ToEnumerable().Select(s => JObject.Parse(s.ToJson(writerSettings)));
        }

        public override IEnumerable<JObject> Get(BsonDocument filter)
        {
            return collection.Find(filter).ToEnumerable().Select(s => JObject.Parse(s.ToJson(writerSettings)));          
        }

        public override JObject FindById(string id)
        {
            return JObject.Parse(collection.Find(new BsonDocument{ {"_id", ObjectId.Parse(id) }}).FirstOrDefault().ToJson(writerSettings));
        }

        public override void Remove(string item)
        {
            var source = collection.Find(new BsonDocument{ {"_id", ObjectId.Parse(item) }}).FirstOrDefault();
            collection.DeleteOne(source);
        }

        public override void Update(BsonDocument filter, BsonDocument item)
        {
            collection.ReplaceOne(filter, item);
        }

        public override void Update(string filter, JObject item)
        {
            var source = collection.Find(new BsonDocument{ {"_id", ObjectId.Parse(filter) }}).FirstOrDefault();
            BsonDocument dest = BsonDocument.Parse(item.ToString(Formatting.None));
            collection.ReplaceOne(source, dest);
        }
    }
}