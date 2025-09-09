using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace LaunchView.Server.ViewModels;

public class RegisterDto
{
    [JsonProperty("FirstName")]
    [Required]
    [MaxLength(50)]
    public string FirstName { get; set; } = string.Empty;
    
    [JsonProperty("LastName")]
    [Required]
    [MaxLength(50)]
    public string LastName { get; set; } = string.Empty;
    
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