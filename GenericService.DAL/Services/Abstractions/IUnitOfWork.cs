using MongoDB.Bson;
using Newtonsoft.Json.Linq;

namespace GenericService.DAL.Services.Abstractions
{
    public interface IUnitOfWork
    {
        IGenericRepository<BsonDocument, string, JObject> Docs { get; }
    }
}