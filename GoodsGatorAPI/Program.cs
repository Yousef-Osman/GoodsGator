using GoodsGatorAPI.Data;
using GoodsGatorAPI.Extensions;
using GoodsGatorAPI.Helpers;
using GoodsGatorAPI.Middlewares;
using GoodsGatorAPI.Models.IdentityEntities;
using GoodsGatorAPI.Repositories;
using GoodsGatorAPI.Repositories.Interfaces;
using GoodsGatorAPI.Services;
using GoodsGatorAPI.Services.interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var config = builder.Configuration;
var defaultConnectionString = config.GetConnectionString("DefaultConnection");
var IdentityConnectionString = config.GetConnectionString("IdentityConnection");
var redisConnectionString = config.GetConnectionString("RedisConnection");

//add database files 
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(defaultConnectionString));
builder.Services.AddDbContext<AppIdentityDbContext>(options => options.UseSqlServer(IdentityConnectionString));

//add identity 
builder.Services.AddIdentityServices(config);

//to add redis database
builder.Services.AddSingleton<IConnectionMultiplexer>(c =>
{
    var configuration = ConfigurationOptions.Parse(redisConnectionString, true);
    return ConnectionMultiplexer.Connect(configuration);
});

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IShoppingCartRepository, ShoppingCartRepository>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddAutoMapper(typeof(MappingProfiles));

builder.Services.AddCors(options => options.AddPolicy("CorsPolicy", policy => policy
    .WithOrigins(config.GetSection("ClientUrl").Value)
    .AllowAnyHeader()
    .AllowAnyMethod()));

//to override the validation behavior of [ApiController] attribute
builder.Services.AddApplicationServices();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// migrate database changes on startup (includes initial db creation)
using (var scope = app.Services.CreateScope())
{
    try
    {
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
        var identityContext = scope.ServiceProvider.GetRequiredService<AppIdentityDbContext>();
        await identityContext.Database.MigrateAsync();
        await SeedAppIdentityContext.SeedUserAsync(userManager);

        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        await context.Database.MigrateAsync();
    }
    catch (Exception)
    {
        //log error here
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");
app.UseStatusCodePagesWithReExecute("/errors/{0}");
app.SeedData();
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.Run();
