using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ReactAppDemo.Server.Models
{
	public enum ErrorType : int
	{
		FieldError = 0,
		CommonError,
		ExceptionError
	}

	public class BaseResViewModel<T>
	{
		public bool HasError { get; set; }
		public T? Value { get; set; }
		public ValidationError? ErrorDetail { get; set; }
	}

	public class ValidationError
	{
		public ErrorType ErrorType { get; set; }
		public string ErrorCode { get; set; }

		public List<ValidationErrors> Errors { get; }

		public ValidationError(ModelStateDictionary modelState, ErrorType errorType = ErrorType.FieldError, string errorCode = "")
		{
			ErrorType = errorType;
			ErrorCode = errorCode;
			Errors = modelState.Where(x => x.Value?.ValidationState == ModelValidationState.Invalid).Select(x => new ValidationErrors(x.Key, modelState[x.Key].Errors.Select(x => x.ErrorMessage).ToArray()))
					.ToList();
		}

		public ValidationError(string key, string message, ErrorType errorType = ErrorType.FieldError, string errorCode = "")
		{
			ErrorType = errorType;
			ErrorCode = errorCode;
			Errors = [new ValidationErrors(key, [message])];
		}
	}

	public class ValidationErrors(string key, string[] messages)
	{
		public string Key { get; } = key != string.Empty ? key : "";

		public string[] Messages { get; } = messages;
	}
}
