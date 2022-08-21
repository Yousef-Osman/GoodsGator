namespace GoodsGatorAPI.Helpers.Pagination;

public class ProductParams: PaginationParams
{
    public string OrderBy { get; set; }
    public string SearchValue { get; set; }
    public List<int> Categories { get; set; }
    public List<int> Brands { get; set; }
}
