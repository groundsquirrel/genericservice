using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace GenericService.DAL.Services.Abstractions
{
    public interface IGenericRepository<TEntity, TKey> 
        where TEntity : class
    {
        void Create(TEntity item);
        TEntity FindById(TKey id);
        IEnumerable<TEntity> Get();
        IEnumerable<TEntity> Get(Expression<Func<TEntity, bool>> filter);
        IEnumerable<TEntity> Get(TEntity filter);
        void Remove(Expression<Func<TEntity, bool>> item);
        void Remove(TEntity item);
        void Update(Expression<Func<TEntity, bool>> filter, TEntity item);
        void Update(TEntity filter, TEntity item);
    }
}