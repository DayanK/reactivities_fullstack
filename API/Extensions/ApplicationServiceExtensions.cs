using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Application.Activities;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistence;
using Application.Core;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration _config)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
            });


            services.AddDbContext<DataContext>(options => {
                options.UseSqlite(_config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(option =>
            {
                option.AddPolicy("CorsPolicy", policy =>
                {

                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });

            services.AddMediatR(typeof (List.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);


            return services;
        }
    }
}