using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using MongoDB.Bson;
using MongoDB.Driver;

namespace GenericService.DAL.Services.Abstractions
{
    public abstract class GenericMongoRepository<TEntity, TKey, TResult> : IGenericRepository<TEntity, TKey, TResult> 
    where TEntity : class
    where TResult : class
    {
        
        protected IMongoCollection<TEntity> collection;
       
        public GenericMongoRepository(IMongoDbContext mongoDbContext, string collectionName)
        {
            collection = mongoDbContext.GetCollection<TEntity>(collectionName);
        }

        public abstract IEnumerable<TResult> Get();

        public abstract IEnumerable<TResult> Get(TEntity filter);
        
        public abstract TResult FindById(TKey id);

        public abstract void Create(TResult item);
        
        public void Update(Expression<Func<TEntity, bool>> filter, TEntity item)
        {
            collection.ReplaceOne((FilterDefinition<TEntity>)filter, item);
        }

        public abstract void Update(TEntity filter, TEntity item);

        public abstract void Update(TKey filter, TResult item);

        public abstract void Remove(TKey item);
    }
}