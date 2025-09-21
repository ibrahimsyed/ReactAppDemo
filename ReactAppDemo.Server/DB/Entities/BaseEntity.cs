using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactAppDemo.Server.DB.Entities
{
	public abstract class BaseEntity
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Column(name: "id")]
		public int Id { get; set; }

		[Timestamp]
		public uint Version { get; set; }

		[Column(name: "created_user_id")]
		public int CreatedUserId { get; set; }

		[Column(name: "created_date")]
		public DateTime CreatedDate { get; set; } = DateTime.Now;

		[Column(name: "updated_user_id")]
		public int UpdatedUserId { get; set; }

		[Column(name: "updated_date")]
		public DateTime UpdatedDate { get; set; } = DateTime.Now;
	}
}
