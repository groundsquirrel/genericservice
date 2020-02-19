using System;
using MongoDB.Bson;
using GenericService.DAL.Services.Abstractions;
using Newtonsoft.Json.Linq;

namespace GenericService.DAL.Services.Abstractions
{
    public interface IUnitOfWork
    {
        IGenericRepository<BsonDocument, string, JObject> Docs { get; }
    }
}