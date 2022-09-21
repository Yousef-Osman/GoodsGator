using GoodsGatorAPI.Data;
using GoodsGatorAPI.Extensions;
using GoodsGatorAPI.Helpers;
using GoodsGatorAPI.Middlewares;
using GoodsGatorAPI.Models.IdentityEntities;
using GoodsGatorAPI.Repositories;
using GoodsGatorAPI.Repositories.Interfaces;
using GoodsGatorAPI.Services;
using GoodsGatorAPI.Services.interfaces;
<<<<<<< HEAD
=======
using Microsoft.AspNetCore.Authentication.JwtBearer;
>>>>>>> c39dcf287f57d23803f12e9bdcfbdae3ccf282ba
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

<<<<<<< HEAD
var config = builder.Configuration;
var defaultConnectionString = config.GetConnectionString("DefaultConnection");
var IdentityConnectionString = config.GetConnectionString("IdentityConnection");
var redisConnectionString = config.GetConnectionString("RedisConnection");
=======
var defaultConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var IdentityConnectionString = builder.Configuration.GetConnectionString("IdentityConnection");
var redisConnectionString = builder.Configuration.GetConnectionString("RedisConnection");
>>>>>>> c39dcf287f57d23803f12e9bdcfbdae3ccf282ba

//add database files 
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(defaultConnectionString));
builder.Services.AddDbContext<AppIdentityDbContext>(options => options.UseSqlServer(IdentityConnectionString));
<<<<<<< HEAD

//add identity 
builder.Services.AddIdentityServices(config);

//to add redis database
=======
builder.Services.AddIdentity<AppUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddEntityFrameworkStores<AppIdentityDbContext>().AddSignInManager<SignInManager<AppUser>>();

//to add redis
>>>>>>> c39dcf287f57d23803f12e9bdcfbdae3ccf282ba
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
<<<<<<< HEAD
    .WithOrigins(config.GetSection("ClientUrl").Value)
=======
    .WithOrigins(builder.Configuration.GetSection("ClientUrl").Value)
>>>>>>> c39dcf287f57d23803f12e9bdcfbdae3ccf282ba
    .AllowAnyHeader()
    .AllowAnyMethod()));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("Token:Key").Value)),
        ValidIssuer = builder.Configuration.GetSection("Token:Issuer").Value,
        ValidateIssuer = true
    };
});

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
