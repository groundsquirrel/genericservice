using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using MongoDB.Bson;
using MongoDB.Driver;

namespace GenericService.DAL.Services.Abstractions
{
    public abstract class GenericMongoRepository<TEntity, TKey> : IGenericRepository<TEntity, TKey> where TEntity : class
    {
        
        protected IMongoCollection<TEntity> collection;
       
        public GenericMongoRepository(IMongoDbContext mongoDbContext, string collectionName)
        {
            collection = mongoDbContext.GetCollection<TEntity>(collectionName);
        }

        public abstract IEnumerable<TEntity> Get();

        public virtual IEnumerable<TEntity> Get(Expression<Func<TEntity, bool>> filter)
        {
            return collection.Find(filter).ToList();
        }

        public abstract IEnumerable<TEntity> Get(TEntity filter);
        
        public abstract TEntity FindById(TKey id);

        public void Create(TEntity item)
        {
            collection.InsertOne(item);
        }
        public void Update(Expression<Func<TEntity, bool>> filter, TEntity item)
        {
            collection.ReplaceOne((FilterDefinition<TEntity>)filter, item);
        }

        public abstract void Update(TEntity filter, TEntity item);

        public void Remove(Expression<Func<TEntity, bool>> item)
        {
            collection.DeleteOne(item);
        }

        public abstract void Remove(TEntity item);
    }
}