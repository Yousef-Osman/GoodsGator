using GoodsGatorAPI.Data;
using GoodsGatorAPI.Models.DbEntities;
using GoodsGatorAPI.Repositories.Interfaces;
//using GoodsGatorAPI.Specifications;
using Microsoft.EntityFrameworkCore;

namespace GoodsGatorAPI.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
{
    private readonly ApplicationDbContext _context;

    public GenericRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<T> GetByIdAsync<G>(G id)
    {
        return await _context.Set<T>().FindAsync(id);
    }

    public async Task<IReadOnlyList<T>> GetAllAsync()
    {
        return await _context.Set<T>().Where(a => a.IsDeleted == false).ToListAsync();
    }

    //public async Task<T> GetEntityWithSpecAsync(ISpecification<T> spec)
    //{
    //    return await ApplySpecifications(spec).FirstOrDefaultAsync();
    //}

    //public async Task<IReadOnlyList<T>> GetAllWithSpecAsync(ISpecification<T> spec)
    //{
    //    return await ApplySpecifications(spec).ToListAsync();
    //}

    //private IQueryable<T> ApplySpecifications(ISpecification<T> spec)
    //{
    //    var query = _context.Set<T>().AsQueryable();
    //    return SpecificationEvaluator<T>.GetQuery(query, spec);
    //}
}
