namespace GoodsGatorAPI.Helpers.Pagination;

public class ProductParams: PaginationParams
{
    public string OrderBy { get; set; }
    public string SearchValue { get; set; }
    public int CategoryId { get; set; }
    public List<int> Brands { get; set; }
}
