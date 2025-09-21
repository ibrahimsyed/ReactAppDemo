using Microsoft.AspNetCore.Mvc;
using ReactAppDemo.Server.Models;

namespace ReactAppDemo.Server.Services
{
	public class BaseService
	{
		protected JsonResult InvalidResult(string message)
		{
			var error = new ValidationError("", message, ErrorType.CommonError, "");
			var result = new BaseResViewModel<string>() { HasError = true, ErrorDetail = error };
			return new JsonResult(result);
		}

		protected JsonResult NotFoundResult()
		{
			var error = new ValidationError("", Models.Constant.MSG_0002, ErrorType.CommonError, "");
			var result = new BaseResViewModel<string>() { HasError = true, ErrorDetail = error };
			return new JsonResult(result);
		}

		protected JsonResult OKResult<T>(T value)
		{
			return new JsonResult(new BaseResViewModel<T>() { Value = value });
		}

		protected JsonResult ExceptionResult(Exception ex)
		{
			//var modelData = JsonConvert.SerializeObject(model)!;
			//var exceptionError = JsonConvert.SerializeObject(ex)!;
			//_commonService.SendErrors($"{this.GetType().Namespace}.{this.GetType().Name}.{methodName}", $"data:{modelData} \n error:{exceptionError}");

			var error = new ValidationError("", Constant.MSG_0000, ErrorType.ExceptionError, "");
			var result = new BaseResViewModel<string>() { HasError = true, ErrorDetail = error };
			return new JsonResult(result);
		}
	}
}
