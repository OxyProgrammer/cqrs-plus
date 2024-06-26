#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Post.Query/Post.Query.Api/Post.Query.Api.csproj", "Post.Query/Post.Query.Api/"]
COPY ["src/CQRS.Core/CQRS.Core.csproj", "CQRS.Core/"]
COPY ["src/Post.Common/Post.Common.csproj", "Post.Common/"]
COPY ["src/Post.Query/Post.Query.Domain/Post.Query.Domain.csproj", "Post.Query/Post.Query.Domain/"]
COPY ["src/Post.Query/Post.Query.Infrastructure/Post.Query.Infrastructure.csproj", "Post.Query/Post.Query.Infrastructure/"]
RUN dotnet restore "/src/Post.Query/Post.Query.Api/Post.Query.Api.csproj"
COPY src/. .
WORKDIR "/src/Post.Query/Post.Query.Api"
RUN dotnet build "./Post.Query.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Post.Query.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Post.Query.Api.dll"]