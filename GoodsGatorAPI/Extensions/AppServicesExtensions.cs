﻿using GoodsGatorAPI.Helpers.Errors;
using Microsoft.AspNetCore.Mvc;

namespace GoodsGatorAPI.Extensions;

public static class AppServicesExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {

        services.Configure<ApiBehaviorOptions>(options =>
        {
            options.InvalidModelStateResponseFactory = actionContext =>
            {
                var errors = actionContext.ModelState
                .Where(e => e.Value.Errors.Count > 0)
                .SelectMany(x => x.Value.Errors)
                .Select(x => x.ErrorMessage).ToArray();

                return new BadRequestObjectResult(new ApiValidationErrorResponse(errors));
            };
        });

        return services;
    }
}
