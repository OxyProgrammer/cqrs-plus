FROM mcr.microsoft.com/dotnet/sdk:8.0 as build
WORKDIR /app

# copy all .csproj files and restore as distinct layers.
# use of the same COPY command for every dockerfile in the project
# to take advantage of docker caching
COPY SM-Post.sln SM-Post.sln
COPY CQRS.Core/CQRS.Core.csproj CQRS.Core/CQRS.Core.csproj
COPY Post.Common/Post.Common.csproj Post.Common/Post.Common.csproj
COPY Post.Query/Post.Query.Domain/Post.Query.Domain.csproj Post.Query/Post.Query.Domain/Post.Query.Domain.csproj
COPY Post.Query/Post.Query.Infrastructure/Post.Query.Infrastructure.csproj Post.Query/Post.Query.Infrastructure/Post.Query.Infrastructure.csproj
COPY Post.Query/Post.Query.Api/Post.Query.Api.csproj Post.Query/Post.Query.Api/Post.Query.Api.csproj
COPY Post.Cmd/Post.Cmd.Domain/Post.Cmd.Domain.csproj Post.Cmd/Post.Cmd.Domain/Post.Cmd.Domain.csproj
COPY Post.Cmd/Post.Cmd.Infrastructure/Post.Cmd.Infrastructure.csproj Post.Cmd/Post.Cmd.Infrastructure/Post.Cmd.Infrastructure.csproj
COPY Post.Cmd/Post.Cmd.Api/Post.Cmd.Api.csproj Post.Cmd/Post.Cmd.Api/Post.Cmd.Api.csproj

# Restore package deps
RUN dotnet restore SM-Post.sln

# Copy the app folders over
COPY CQRS.Core/CQRS.Core.csproj CQRS.Core/CQRS.Core.csproj
COPY Post.Common/Post.Common.csproj Post.Common/Post.Common.csproj
COPY Post.Query/Post.Query.Domain/Post.Query.Domain.csproj Post.Query/Post.Query.Domain/Post.Query.Domain.csproj
COPY Post.Query/Post.Query.Infrastructure/Post.Query.Infrastructure.csproj Post.Query/Post.Query.Infrastructure/Post.Query.Infrastructure.csproj
COPY Post.Query/Post.Query.Api/Post.Query.Api.csproj Post.Query/Post.Query.Api/Post.Query.Api.csproj
WORKDIR /app/Post.Query/Post.Query.Api
RUN dotnet publish -c Release -o /app/Post.Query/out

#Build run time event
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/Post.Query/out .
# Expose port 80 for the API
EXPOSE 8080
ENTRYPOINT [ "dotnet", "Post.Query.Api.dll" ]