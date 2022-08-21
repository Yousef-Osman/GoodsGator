using Microsoft.EntityFrameworkCore;

namespace GoodsGatorAPI.Helpers.Pagination;

public class PagedList<T>: List<T>
{
    public MetaData MetaData { get; set; }
    public PagedList(List<T> items, int pageNumber, int pageSize, int itemsCount)
    {
        MetaData = new MetaData()
        {
            CurrentPage = pageNumber,
            PageSize = pageSize,
            TotalCount = itemsCount,
            TotalPages = (int)Math.Ceiling(itemsCount / (double)pageSize)
        };

        AddRange(items);
    }

    public static async Task<PagedList<T>> ToPagedListAsync(IQueryable<T> query, int pageNumber, int pageSize)
    {
        var itemsCount = await query.CountAsync();
        var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
        return new PagedList<T>(items, pageNumber, pageSize, itemsCount);
    }
}
