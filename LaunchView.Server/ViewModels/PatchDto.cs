using System.Text.Json.Serialization;

namespace LaunchView.Server.ViewModels;

public class PatchDto
{
    [JsonPropertyName("small")]
    public string? SmallImage { get; set; }

    [JsonPropertyName("large")]
    public string? LargeImage { get; set; }
}