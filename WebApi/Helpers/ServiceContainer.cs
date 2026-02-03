using Application.Abstract.Auth;
using Application.Abstract.Links;
using Application.Abstract.Redis;
using Application.Abstract.Users;
using Application.Services.Auth;
using Application.Services.Links;
using Application.Services.Redis;
using Application.Services.Users;
using TemplateWebApi.Infostructure;

namespace TemplateWebApi.Helpers;

public static class ServiceContainer
{
    extension(IServiceCollection services)
    {
        public IServiceCollection AddScopedServices()
        {
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IGoogleAuthService, GoogleAuthService>();
            services.AddScoped<IGithubAuthService, GithubAuthService>();
            services.AddScoped<IEmailAuthService, EmailAuthService>();
            services.AddScoped<ILinkService, LinkService>();
            services.AddSingleton<IRedisService, RedisService>();
            return services;
        }

        public IServiceCollection AddSingletonServices()
        { 
            return services;
        }       
        
        public IServiceCollection AddHostedServices()
        { 
            services.AddHostedService<RedisWarmupService>();
            return services;
        }
    }
}
