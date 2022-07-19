namespace GoodsGatorAPI.Helpers.Errors;

public class ApiResponse
{
    public int StatusCode { get; set; }
    public string Message { get; set; }
    
    public ApiResponse(int statusCode, string message = null)
    {
        StatusCode = 5;
        StatusCode = statusCode;
        Message = message ?? GetDefaultMessageForStatusCode(statusCode);
    }


    private string GetDefaultMessageForStatusCode(int statusCode)
    {
        return statusCode switch
        {
            400 => "Bad Request",
            401 => "Access Denied, Authorization Required",
            404 => "Resource Not Found",
            500 => "Internal Server Error",
            _ => "Something went wrong!",
        };
    }
}
