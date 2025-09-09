using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace LaunchView.Server.ViewModels;

public class LoginDto
{
    [JsonProperty("Email")]
    [Required]
    [EmailAddress]
    [MaxLength(50)]
    public string Email { get; set; } = string.Empty;
    
    [JsonProperty("Password")]
    [Required]
    [MaxLength(256)]
    public string Password { get; set; } =  string.Empty;
}