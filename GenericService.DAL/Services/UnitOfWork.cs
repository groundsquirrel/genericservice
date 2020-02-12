using System;
using MongoDB.Bson;
using GenericService.DAL.Services.Abstractions;

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

        public IGenericRepository<BsonDocument, string> Docs
        {
            get
            {
                if (bsonDocumentRepository == null)
                    bsonDocumentRepository = new BsonDocumentRepository(_context, "generic");
                return bsonDocumentRepository;
            }
        }
    }
}