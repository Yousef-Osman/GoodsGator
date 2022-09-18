using GoodsGatorAPI.Data;
using GoodsGatorAPI.Extensions;
using GoodsGatorAPI.Helpers;
using GoodsGatorAPI.Middlewares;
using GoodsGatorAPI.Models.IdentityEntities;
using GoodsGatorAPI.Repositories;
using GoodsGatorAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var defaultConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var IdentityConnectionString = builder.Configuration.GetConnectionString("IdentityConnection");
var redisConnectionString = builder.Configuration.GetConnectionString("RedisConnection");

//add database files 
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(defaultConnectionString));
builder.Services.AddDbContext<AppIdentityDbContext>(options => options.UseSqlServer(IdentityConnectionString));
builder.Services.AddIdentity<AppUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddEntityFrameworkStores<AppIdentityDbContext>().AddSignInManager<SignInManager<AppUser>>();

//to add redis
builder.Services.AddSingleton<IConnectionMultiplexer>(c =>
{
    var configuration = ConfigurationOptions.Parse(redisConnectionString, true);
    return ConnectionMultiplexer.Connect(configuration);
}); 

builder.Services.Configure<IdentityOptions>(options =>
{
    // Password settings.
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 0;

    // User settings.
    options.User.AllowedUserNameCharacters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
});

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IShoppingCartRepository, ShoppingCartRepository>();
builder.Services.AddAutoMapper(typeof(MappingProfiles));

builder.Services.AddCors(options => options.AddPolicy("CorsPolicy", policy => policy
    .WithOrigins(builder.Configuration.GetSection("AppSettings:ClientUrl").Value)
    .AllowAnyHeader()
    .AllowAnyMethod()));

builder.Services.AddAuthentication();

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
