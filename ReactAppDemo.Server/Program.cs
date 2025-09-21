using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactAppDemo.Server.DB;
using ReactAppDemo.Server.Models;
using ReactAppDemo.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
	.ConfigureApiBehaviorOptions(options =>
	{
		options.InvalidModelStateResponseFactory = context =>
		{
			var error = new ValidationError(context.ModelState);
			var result = new BaseResViewModel<string>() { HasError = true, ErrorDetail = error };
			return new JsonResult(result);
			//var errors = context.ModelState
			//	.Where(x => x.Value.Errors.Count > 0)
			//	.Select(x => new
			//	{
			//		Field = x.Key,
			//		Messages = x.Value.Errors.Select(e => e.ErrorMessage).ToArray()
			//	});
			//var response = new
			//{
			//	HasError = true,
			//	ErrorDetail = errors
			//};
			//return new BadRequestObjectResult(response);
		};
	});

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAll", policy =>
	{
		policy.AllowAnyOrigin()
			  .AllowAnyHeader()
			  .AllowAnyMethod();
	});
});

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
builder.Services.AddDbContext<DemoContext>(opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("DemoContext")));

builder.Services.AddScoped<IAppSettingService, AppSettingService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.UseCors("AllowAll");

app.Run();
