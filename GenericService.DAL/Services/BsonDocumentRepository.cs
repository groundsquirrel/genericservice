using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using GenericService.DAL.Services.Abstractions;

namespace GenericService.DAL.Services
{
    public class BsonDocumentRepository : GenericMongoRepository<BsonDocument, string>
    {
        public BsonDocumentRepository(IMongoDbContext mongoDbContext, string collectionName) : base(mongoDbContext, collectionName)
        {
        }

        public override IEnumerable<BsonDocument> Get()
        {
            return collection.Find(new BsonDocument()).ToList();
        }

        public override IEnumerable<BsonDocument> Get(BsonDocument filter)
        {
            return collection.Find(filter).ToEnumerable();          
        }

        public override BsonDocument FindById(string id)
        {
            return collection.Find(new BsonDocument{ {"_id", ObjectId.Parse(id) }}).FirstOrDefault();
        }

        public override void Remove(BsonDocument item)
        {
            collection.DeleteMany(item);
        }

        public override void Update(BsonDocument filter, BsonDocument item)
        {
            collection.ReplaceOne(filter, item);
        }
    }
}