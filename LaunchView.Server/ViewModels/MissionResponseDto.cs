using System.Text.Json.Serialization;

namespace LaunchView.Server.ViewModels;

public class MissionResponseDto
{
    [JsonPropertyName("docs")]
    public List<MissionDto> Docs { get; set; } = new List<MissionDto>();
    
    [JsonPropertyName("totalDocs")]
    public int TotalDocs { get; set; }
    
}