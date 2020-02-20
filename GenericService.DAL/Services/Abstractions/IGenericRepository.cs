using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace GenericService.DAL.Services.Abstractions
{
    public interface IGenericRepository<TEntity, TKey, TResult> 
        where TEntity : class
        where TResult : class
    {
        TResult Create(TResult item);
        TResult FindById(TKey id);
        IEnumerable<TResult> Get();
        IEnumerable<TResult> Get(TEntity filter);
        void Remove(TKey item);
        void Update(Expression<Func<TEntity, bool>> filter, TEntity item);
        void Update(TKey filter, TResult item);
    }
}