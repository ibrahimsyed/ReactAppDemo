using System.ComponentModel.DataAnnotations.Schema;

namespace ReactAppDemo.Server.DB.Entities
{
	[Table(name: "m_customer_image")]
	public class CustomerImageEntity : BaseEntity
	{
		[Column(name: "customer_id")]
		public int CustomerId { get; set; }

		[Column(name: "line_no")]
		public int LineNo { get; set; }

		[Column(name: "file_name")]
		public string FileName { get; set; } = string.Empty;

		[Column(name: "base64_data")]
		public string Base64Data { get; set; } = string.Empty;
		public CustomerEntity? Customer { get; set; }
	}
}
