using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace LaunchView.Server.ViewModels;

public class MissionDto
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;
    
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("date_utc")]
    public DateTime DateUtc { get; set; }

    [JsonPropertyName("success")]
    public bool? Success { get; set; }

    [JsonPropertyName("details")]
    public string? Details { get; set; }

    [JsonPropertyName("cores")]
    public List<CoreDto> Cores { get; set; } = new();

    [JsonPropertyName("links")]
    public LinksDto Links { get; set; } = new();
}

