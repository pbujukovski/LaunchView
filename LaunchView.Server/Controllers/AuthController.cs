using LaunchView.Server.Services.Interfaces;
using LaunchView.Server.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace LaunchView.Server.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        [HttpPost("login")]
        public async Task<string> LoginAsync(LoginDto request)
        {
            return await authService.SignInAsync(request);
        }
        
        [HttpPost("register")]
        public async Task<string> RegisterAsync(RegisterDto request)
        {
            return await authService.RegisterAsync(request);
        }
    }
}
