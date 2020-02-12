using System;
using MongoDB.Bson;
using GenericService.DAL.Services.Abstractions;

namespace GenericService.DAL.Services.Abstractions
{
    public interface IUnitOfWork
    {
        IGenericRepository<BsonDocument, string> Docs { get; }
    }
}