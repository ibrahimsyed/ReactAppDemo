using Microsoft.AspNetCore.Mvc;
using ReactAppDemo.Server.Models;
using ReactAppDemo.Server.Services;

namespace ReactAppDemo.Server.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class CustomersController(ICustomerService customerService) : BaseController
	{
		private readonly ICustomerService _customerService = customerService;

		[HttpGet]
		public async Task<IActionResult> GetCustomers()
		{
			return await _customerService.GetCustomers();
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetCustomer(int id)
		{
			return await _customerService.GetCustomer(id);
		}

		[HttpPost]
		public async Task<IActionResult> AddCustomer([FromBody] CustomerModel model)
		{
			return await _customerService.AddCustomer(model);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateCustomer(int id, [FromBody] CustomerModel model)
		{
			return await _customerService.UpdateCustomer(id, model);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteCustomer(int id)
		{
			return await _customerService.DeleteCustomer(id);
		}

		[HttpGet("{id}/images")]
		public async Task<IActionResult> GetImages(int id)
		{
			return await _customerService.GetImages(id);
		}

		[HttpPost("{id}/images")]
		public async Task<IActionResult> UploadImages(int id, [FromBody] List<CustomerImageModel> images)
		{
			return await _customerService.AddImages(id, images);
		}

		[HttpDelete("{id}/images/{imageId}")]
		public async Task<IActionResult> DeleteImage(int id, int imageId)
		{
			return await _customerService.DeleteImage(id, imageId);
		}
	}
}
