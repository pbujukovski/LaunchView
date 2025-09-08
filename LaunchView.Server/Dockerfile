FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["LaunchView.Server/LaunchView.Server.csproj", "LaunchView.Server/"]
COPY ["LaunchView.client/LaunchView.client.esproj", "LaunchView.client/"]
RUN dotnet restore "LaunchView.Server/LaunchView.Server.csproj"
COPY . .
WORKDIR "/src/LaunchView.Server"
RUN dotnet build "./LaunchView.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./LaunchView.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LaunchView.Server.dll"]
