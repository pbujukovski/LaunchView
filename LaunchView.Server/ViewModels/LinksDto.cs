using System.Text.Json.Serialization;

namespace LaunchView.Server.ViewModels;

public sealed class LinksDto
{
    [JsonPropertyName("patch")]
    public PatchDto Patch { get; set; } = new();
}