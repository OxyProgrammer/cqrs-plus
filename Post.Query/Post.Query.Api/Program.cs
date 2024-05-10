using Confluent.Kafka;
using CQRS.Core.Consumers;
using Microsoft.EntityFrameworkCore;
using Post.Query.Api.Extensions;
using Post.Query.Api.Queries;
using Post.Query.Domain.Repository;
using Post.Query.Infrastructure.Consumers;
using Post.Query.Infrastructure.DataAccess;
using Post.Query.Infrastructure.Handlers;
using Post.Query.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

Action<DbContextOptionsBuilder> configureDbContext = o =>o.UseLazyLoadingProxies()
.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSql"));

//Add services to the container.
builder.Services.AddDbContext<DatabaseContext>(configureDbContext);
builder.Services.AddSingleton<DatabaseContextFactory>(new DatabaseContextFactory(configureDbContext));

builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<IQueryHandler, QueryHandler>();
builder.Services.ConfigureQueryHandlers();
builder.Services.AddScoped<IEventHandler, Post.Query.Infrastructure.Handlers.EventHandler>();
builder.Services.Configure<ConsumerConfig>(builder.Configuration.GetSection(nameof(ConsumerConfig)));
builder.Services.AddScoped<IEventConsumer, EventConsumer>();

builder.Services.AddControllers();

builder.Services.AddHostedService<ConsumerHostedService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Create and seed database
builder.Services.EsnureDbCreated();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
