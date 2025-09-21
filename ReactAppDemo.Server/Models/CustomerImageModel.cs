using System.ComponentModel.DataAnnotations;

namespace ReactAppDemo.Server.Models
{
	public class CustomerModel : IValidatableObject
	{
		//public string Code { get; set; } = string.Empty;
		public string? FirstName { get; set; } = string.Empty;
		public string? LastName { get; set; } = string.Empty;

		public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
		{
			//if (string.IsNullOrEmpty($"{Code}".Trim()))
			//{
			//	yield return new ValidationResult(Constant.MSG_0001, ["Code"]);
			//}

			if (string.IsNullOrEmpty($"{FirstName}".Trim()))
			{
				yield return new ValidationResult(Constant.MSG_0001, ["firstName"]);
			}

			if (string.IsNullOrEmpty($"{LastName}".Trim()))
			{
				yield return new ValidationResult(Constant.MSG_0001, ["lastName"]);
			}
		}
	}

	public class CustomerImageModel
	{
		public string FileName { get; set; } = string.Empty;
		public string Base64 { get; set; } = string.Empty;
	}
}
