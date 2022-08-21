using GoodsGatorAPI.Helpers.Pagination;
using System.Text.Json;

namespace GoodsGatorAPI.Extensions;

public static class HttpExtensions
{
    public static void AddPaginationHeaders(this HttpResponse response, MetaData metaData)
    {
        var options = new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        response.Headers.Add("Pagination", JsonSerializer.Serialize(metaData, options));
        response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
    }
}
