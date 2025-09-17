# LaunchView
LaunchView is a modern web application that provides real-time access to SpaceX mission data. Built with Angular and ASP.NET Core, it offers users an intuitive interface to explore the latest, upcoming, and past launches.

<img width="1648" height="867" alt="image" src="https://github.com/user-attachments/assets/27070614-7dae-4e79-8665-de69bac4227b" />

## Features
- Browse **upcoming, past, and latest** SpaceX launches 

## 
Before running locally, make sure you have installed:
- [Node.js](https://nodejs.org/) (v22+ recommended)  
- [Angular CLI](https://angular.io/cli)  
- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)  

##

### Clone the repository
```bash
git clone https://github.com/pbujukovski/LaunchView.git
cd LaunchView
```


### Frontend setup
```bash
cd client
npm install
ng serve
```

### Backend setup
```bash
cd ../server
dotnet restore
dotnet run
```
## 🐳 Docker (SQL Server Database)

This project uses a SQL Server instance via Docker Compose.

### docker-compose.yml (DB service)

##

### Migration commands
```bash
dotnet ef migrations add <MigrationName>
dotnet ef database update
```



