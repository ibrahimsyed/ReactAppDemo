using Microsoft.EntityFrameworkCore;
using ReactAppDemo.Server.DB.Entities;

namespace ReactAppDemo.Server.DB
{
	public class DemoContext(DbContextOptions<DemoContext> options) : DbContext(options)
	{
		public DbSet<CustomerEntity> Customers { get; set; }
		public DbSet<CustomerImageEntity> CustomerImages { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			//Define RowVersion
			modelBuilder.Entity<CustomerEntity>().Property(b => b.Version).IsRowVersion();
			modelBuilder.Entity<CustomerImageEntity>().Property(b => b.Version).IsRowVersion();

			//Define FK
			modelBuilder.Entity<CustomerEntity>().HasMany(e => e.Images).WithOne(e => e.Customer).HasConstraintName("m_customer_image_fk_customer");
		}
	}
}
