﻿using GoodsGatorAPI.Models.DbEntities;
using System.Text.Json;

namespace GoodsGatorAPI.Data;

public static class SeedAppContext
{
    public static IHost SeedData(this IHost host)
    {
        using (var scope = host.Services.CreateScope())
        {
            using (var context = scope.ServiceProvider.GetRequiredService<AppDbContext>())
            {
                try
                {
                    SeedBrands(context);
                    SeedCategories(context);
                    SeedProducts(context);
                }
                catch (Exception)
                {

                }
            }
        }

        return host;
    }

    private static void SeedBrands(AppDbContext context)
    {
        if (!context.Brands.Any())
        {
            var brandsData = File.ReadAllText("./Data/SeedData/Brands.json");
            var brands = JsonSerializer.Deserialize<List<Brand>>(brandsData);
            context.Brands.AddRange(brands);
            context.SaveChanges();
        }
    }

    private static void SeedCategories(AppDbContext context)
    {
        if (!context.Categories.Any())
        {
            var categoriesData = File.ReadAllText("./Data/SeedData/Categories.json");
            var categories = JsonSerializer.Deserialize<List<Category>>(categoriesData);
            context.Categories.AddRange(categories);
            context.SaveChanges();
        }
    }

    private static void SeedProducts(AppDbContext context)
    {
        if (!context.Products.Any())
        {
            var productsData = File.ReadAllText("./Data/SeedData/Products.json");
            var products = JsonSerializer.Deserialize<List<Product>>(productsData);
            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}
