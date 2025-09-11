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
        public async Task<IActionResult> LoginAsync(LoginDto request)
        {
            
            AuthResponseDto authResponseDto = new AuthResponseDto();
   
            try
            { 
                authResponseDto.Token = await authService.SignInAsync(request);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
            return Ok(authResponseDto);
        }
        
        [HttpPost("register")]
        public async Task<string> RegisterAsync(RegisterDto request)
        {
            return await authService.RegisterAsync(request);
        }
    }
}
