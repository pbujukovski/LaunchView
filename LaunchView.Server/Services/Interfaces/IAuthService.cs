using LaunchView.Server.ViewModels;

namespace LaunchView.Server.Services.Interfaces;

public interface IAuthService
{
    Task<string> RegisterAsync(RegisterDto registerDto);

    Task<string> SignInAsync(LoginDto loginDto);
}