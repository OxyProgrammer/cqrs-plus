var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

builder.Services.AddControllers();

builder.Services.AddCors();

var app = builder.Build();
//This is not a good practice, but done to bypass complications for UI app.
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.MapReverseProxy();

app.UseAuthorization();

app.MapControllers();

app.Run();