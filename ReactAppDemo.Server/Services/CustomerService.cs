using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactAppDemo.Server.DB;
using ReactAppDemo.Server.Models;
using System.Buffers.Text;

namespace ReactAppDemo.Server.Services
{
	/// <summary>
	/// Customer Service interface
	/// </summary>
	public interface ICustomerService
	{
		Task<JsonResult> GetCustomers();
		Task<JsonResult> GetCustomer(int customerId);
		Task<JsonResult> AddCustomer(CustomerModel model);
		Task<JsonResult> UpdateCustomer(int customerId, CustomerModel model);
		Task<JsonResult> DeleteCustomer(int customerId);
		Task<JsonResult> GetImages(int customerId);
		Task<JsonResult> AddImages(int customerId, IList<CustomerImageModel> images);
		Task<JsonResult> DeleteImage(int customerId, int imageId);
	}

	/// <summary>
	/// Customer Service class
	/// </summary>
	public class CustomerService : BaseService, ICustomerService
	{
		private readonly DemoContext _demoContext;
		private readonly IAppSettingService _appSettingService;

		public CustomerService(DemoContext demoContext, IAppSettingService appSettingService)
		{
			_demoContext = demoContext;
			_appSettingService = appSettingService;
		}

		/// <summary>
		/// Get customers
		/// </summary>
		/// <returns></returns>
		public async Task<JsonResult> GetCustomers()
		{
			try
			{
				var images = await _demoContext.Customers.ToListAsync();
				var ret = images.Select(x => new
				{
					x.Id,
					x.FirstName,
					x.LastName
				}).OrderBy(x=>x.Id).ToList();

				return OKResult(ret);
			}
			catch (Exception ex)
			{
				return ExceptionResult(ex);
			}
		}

		/// <summary>
		/// Get customer
		/// </summary>
		/// <param name="customerId">Customer Id</param>
		/// <returns></returns>
		public async Task<JsonResult> GetCustomer(int customerId)
		{
			try
			{
				var customer = await _demoContext.Customers.Where(x => x.Id == customerId).FirstOrDefaultAsync();
				if (customer == null) return NotFoundResult();

				return OKResult(new
				{
					customer.Id,
					customer.FirstName,
					customer.LastName
				});
			}
			catch (Exception ex)
			{
				return ExceptionResult(ex);
			}
		}

		/// <summary>
		/// Add customer
		/// </summary>
		/// <param name="model">Customer</param>
		/// <returns></returns>
		public async Task<JsonResult> AddCustomer(CustomerModel model)
		{
			try
			{
				_demoContext.Customers.Add(new DB.Entities.CustomerEntity()
				{
					//Code = model.Code,
					FirstName = model.FirstName,
					LastName = model.LastName
				});

				await _demoContext.SaveChangesAsync();
				return OKResult(true);
			}
			catch (Exception ex)
			{
				return ExceptionResult(ex);
			}
		}

		/// <summary>
		/// Update customer
		/// </summary>
		/// <param name="customerId">Customer Id</param>
		/// <param name="model">Customer</param>
		/// <returns></returns>
		public async Task<JsonResult> UpdateCustomer(int customerId, CustomerModel model)
		{
			try
			{
				var customer = await _demoContext.Customers.Where(x => x.Id == customerId).FirstOrDefaultAsync();
				if (customer == null) return NotFoundResult();

				//customer.Code = model.Code;
				customer.FirstName = model.FirstName;
				customer.LastName = model.LastName;

				await _demoContext.SaveChangesAsync();
				return OKResult(true);
			}
			catch (Exception ex)
			{
				return ExceptionResult(ex);
			}
		}

		/// <summary>
		/// Delete customer
		/// </summary>
		/// <param name="customerId">Customer Id</param>
		/// <returns></returns>
		public async Task<JsonResult> DeleteCustomer(int customerId)
		{
			try
			{
				var customer = await _demoContext.Customers.Where(x => x.Id == customerId).FirstOrDefaultAsync();
				if (customer == null) return NotFoundResult();

				_demoContext.Customers.Remove(customer);

				await _demoContext.SaveChangesAsync();
				return OKResult(true);
			}
			catch (Exception ex)
			{
				return ExceptionResult(ex);
			}
		}

		/// <summary>
		/// Get images
		/// </summary>
		/// <param name="customerId">Customer Id</param>
		/// <returns></returns>
		public async Task<JsonResult> GetImages(int customerId)
		{
			try
			{
				var images = await _demoContext.CustomerImages.Where(x => x.CustomerId == customerId).ToListAsync();
				var ret = images.Select(x => new
				{
					x.Id,
					x.FileName,
					Base64 = x.Base64Data
				}).ToList();

				return OKResult(ret);
			}
			catch (Exception ex)
			{
				return ExceptionResult(ex);
			}
		}

		/// <summary>
		/// Add images
		/// </summary>
		/// <param name="customerId">Customer Id</param>
		/// <param name="images">List of image</param>
		/// <returns></returns>
		public async Task<JsonResult> AddImages(int customerId, IList<CustomerImageModel> images)
		{
			try
			{
				using var transaction = await _demoContext.Database.BeginTransactionAsync();

				var currentCount = await _demoContext.CustomerImages.Where(img => img.CustomerId == customerId).CountAsync();
				if (currentCount + images.Count > _appSettingService.GetMaxNumberOfFile())
				{
					return InvalidResult(Models.Constant.MSG_0003);
				}

				foreach (var image in images)
				{
					_demoContext.CustomerImages.Add(new DB.Entities.CustomerImageEntity()
					{
						CustomerId = customerId,
						FileName = image.FileName,
						Base64Data = image.Base64
					});
				}

				await _demoContext.SaveChangesAsync();
				await transaction.CommitAsync();
				return OKResult(true);
			}
			catch (Exception ex)
			{
				return ExceptionResult(ex);
			}
		}

		/// <summary>
		/// Delete image
		/// </summary>
		/// <param name="customerId">Customer Id</param>
		/// <param name="imageId">Image Id</param>
		/// <returns></returns>
		public async Task<JsonResult> DeleteImage(int customerId, int imageId)
		{
			try
			{
				var image = await _demoContext.CustomerImages.Where(x => x.CustomerId == customerId && x.Id == imageId).FirstOrDefaultAsync();
				if (image == null) return NotFoundResult();

				_demoContext.CustomerImages.Remove(image);
				await _demoContext.SaveChangesAsync();
				return OKResult(true);
			}
			catch (Exception ex)
			{
				return ExceptionResult(ex);
			}
		}
	}
}
