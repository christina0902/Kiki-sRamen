# Kiki's Ramen
## Problem Solved
Running a ramen shop involves ensuring customers receive a seamless and satisfying dining experience. However, the challenges of managing online orders can be daunting. You might be concerned about handling a high volume of orders, maintaining order accuracy, or providing a smooth user experience on your online platform.

This website aims to solve these issues with a dual-pronged approach:
- Robust Online Ordering System: An intuitive, user-friendly platform that simplifies the ordering process, ensuring accuracy and efficiency.
- Built-in Order Tracking: Real-time order tracking allows customers to monitor their orders from preparation to delivery, enhancing transparency and trust.

## Technologies Used
- ReactJS
- EF Core 8.0
- PostgreSQL 16
- JavaScript
- HTML5
- CSS3
- Vite
- Reactstrap

## Installation and Setup Instructions

Clone this repository, and ensure you have the following installed on your machine:
- [node](https://github.com/nodejs/node)
- [npm](https://github.com/npm/cli)
- [.Net 8.0.101 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [PostgreSQL 16](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

Then run the following command
```
dotnet tool install --global dotnet-ef --framework net8.0
```
#### Installation
Navigate to the cloned directory and run the following
```
dotnet user-secrets init
```
```
dotnet user-secrets set 'CPYouDbConnectionString' 'Host=localhost;Port=5432;Username=postgres;Password=<your_postgresql_password>;Database=CPYou'
```
```
dotnet user-secrets set AdminPassword password
```
```
dotnet restore
```
```
dotnet ef migrations add InitialCreate
```
```
dotnet ef database update
```
Then navigate to the client directory and run the following
```
npm install
```
#### Run Database
Run the following command in the project root directory
```
dotnet watch run --launch-profile https
```
#### Run Website
Navigate to the client directory and run the following
```
npm run dev
```
