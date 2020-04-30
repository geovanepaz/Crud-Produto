using API.Configuration;
using API.Filters;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Produto.Application.AutoMapper;
using Produto.Application.IoC;
using Produto.Application.ViewModels.AppSettings;
using Produto.Infra.Contexts;
using Swashbuckle.AspNetCore.Swagger;
using System.Collections.Generic;
using AutoMapper;

namespace API
{
    public class Startup
    {
        private readonly bool _swaggerEnable;
        public IConfiguration Configuration { get; }

        public Startup(IHostingEnvironment hostEnvironment)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(hostEnvironment.ContentRootPath)
                .AddJsonFile("appsettings.json", true, true)
                .AddJsonFile($"appsettings.{hostEnvironment.EnvironmentName}.json", true, true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
            _swaggerEnable = Configuration.GetSection("Swagger").Get<SwaggerSettings>().Ativo;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<IISOptions>(o =>
            {
                o.ForwardClientCertificate = false;
            });

            services.AddDistributedRedisCache(options =>
            {
                options.Configuration = Configuration.GetConnectionString("RedisConnection");
                options.InstanceName = "crud:";
            });

            services.AddIdentityConfiguration(Configuration);

            services.AddDbContext<ProdutoContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddAutoMapper(typeof(DomainToViewModelMappingProfile), typeof(ViewModelToDomainMappingProfile));

            services
                .AddMvc(o =>
                {
                    o.Filters.Add(typeof(ValidateModelAttribute));
                    o.Filters.Add(typeof(ApiExceptionFilter));
                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .ConfigureApiBehaviorOptions(o => { o.SuppressModelStateInvalidFilter = true; })
                .AddFluentValidation(o => o.RegisterValidatorsFromAssemblyContaining<Startup>());

            services.AddApiVersioning(options =>
            {
                options.AssumeDefaultVersionWhenUnspecified = true;
                options.DefaultApiVersion = new ApiVersion(1, 0);
                options.ReportApiVersions = true;
            });

            services.AddVersionedApiExplorer(o => { o.GroupNameFormat = "'v'VVV"; });

            if (_swaggerEnable)
            {
                services.AddSwaggerGen(c =>
                {
                    var provider = services.BuildServiceProvider().GetRequiredService<IApiVersionDescriptionProvider>();

                    foreach (var description in provider.ApiVersionDescriptions)
                    {
                        c.SwaggerDoc(description.GroupName, new Info
                        {
                            Title = $"Conta Corrente Api {description.ApiVersion}",
                            Version = description.ApiVersion.ToString()
                        });
                    }

                    var security = new Dictionary<string, IEnumerable<string>>
                    {
                        {"Bearer", new string[] { }}
                    };

                    c.AddSecurityDefinition("Bearer", new ApiKeyScheme
                    {
                        Description = "Insira o token JWT desta maneira: Bearer {seu token}",
                        Name = "Authorization",
                        In = "header",
                        Type = "apiKey"
                    });

                    c.AddSecurityRequirement(security);
                });

                services.ResolveDependencies();
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IApiVersionDescriptionProvider provider)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors(c =>
           {
               c.AllowAnyHeader();
               c.AllowAnyMethod();
               c.AllowAnyOrigin();
           });

            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseHttpsRedirection();

            if (_swaggerEnable)
            {
                app.UseSwagger();

                app.UseSwaggerUI(options =>
                {
                    foreach (var description in provider.ApiVersionDescriptions)
                    {
                        options.SwaggerEndpoint(
                            $"/swagger/{description.GroupName}/swagger.json",
                            description.GroupName.ToUpperInvariant());

                        options.DefaultModelExpandDepth(0);
                        options.DefaultModelsExpandDepth(-1);
                    }
                });
            }

            app.UseMvc();
        }
    }
}
