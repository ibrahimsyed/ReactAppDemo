using System.ComponentModel.DataAnnotations.Schema;

namespace ReactAppDemo.Server.DB.Entities
{
	[Table(name: "m_customer")]
	public class CustomerEntity : BaseEntity
	{
		[Column(name: "first_name")]
		public string FirstName { get; set; } = string.Empty;

		[Column(name: "last_name")]
		public string LastName { get; set; } = string.Empty;
		public IList<CustomerImageEntity>? Images { get; set; }
	}
}
