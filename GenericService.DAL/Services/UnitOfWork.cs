using System;
using MongoDB.Bson;
using GenericService.DAL.Services.Abstractions;
using Newtonsoft.Json.Linq;

namespace GenericService.DAL.Services
{
    public class UnitOfWork : IUnitOfWork
    {
        readonly IMongoDbContext _context;

        private BsonDocumentRepository bsonDocumentRepository;
        
        public UnitOfWork(IMongoDbContext context)
        {
            _context = context;
        }

        public IGenericRepository<BsonDocument, string, JObject> Docs
        {
            get
            {
                if (bsonDocumentRepository == null)
                    bsonDocumentRepository = new BsonDocumentRepository(_context, "docs");
                return bsonDocumentRepository;
            }
        }
    }
}