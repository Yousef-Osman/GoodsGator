namespace GoodsGatorAPI.Helpers.Pagination;

public class ProductParams: PaginationParams
{
    public string OrderBy { get; set; }
    public string SearchValue { get; set; }
    public string Categories { get; set; }
    public string Brands { get; set; }
}
