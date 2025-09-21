namespace ReactAppDemo.Server.Services
{
	public interface IAppSettingService
	{
		int GetMaxNumberOfFile();
	}

	public class AppSettingService : IAppSettingService
	{
		private readonly IConfiguration _configuration;

		public AppSettingService(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		public int GetMaxNumberOfFile() 
		{
			return _configuration.GetValue<int>("AppSetting:MaxNumberOfFile");
		}
	}
}
