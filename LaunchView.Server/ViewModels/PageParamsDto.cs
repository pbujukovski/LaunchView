using System.Text.Json.Serialization;

namespace LaunchView.Server.ViewModels;

public class PageParamsDto
{
    [JsonPropertyName("pageIndex")]
    public int PageIndex { get; set; }
    
    [JsonPropertyName("pageSize")]
    public int PageSize {get; set; }
    
    [JsonPropertyName("sort")]
    public string Sort { get; set; } = string.Empty;
    
    [JsonPropertyName("order")]
    public string Order { get; set; } = string.Empty;
    
    [JsonPropertyName("filter")]
    public string Filter { get; set; } = string.Empty;
}