var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddCors(options =>
{
    options.AddPolicy("customPolicy", b =>
    {
        b.AllowAnyMethod()
           .AllowAnyHeader()
           .SetIsOriginAllowed(origin => true)
           .AllowCredentials();
    });
});
var app = builder.Build();
app.UseCors();
app.MapReverseProxy();

app.UseAuthorization();

app.MapControllers();

app.Run();