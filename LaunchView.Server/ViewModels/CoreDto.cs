using System.Text.Json.Serialization;

namespace LaunchView.Server.ViewModels;

public sealed class CoreDto
{
        [JsonPropertyName("core")]
        public string CoreId { get; init; } = string.Empty;
        
        [JsonPropertyName("serial")]
        public string Serial { get; init; } = string.Empty;
        
        [JsonPropertyName("flight")]
        public int? Flight { get; init; }
        
        [JsonPropertyName("landing_attempt")]
        public bool? LandingAttempt { get; init; }
        
        [JsonPropertyName("landing_success")]
        public bool? LandingSuccess { get; init; }
        
        [JsonPropertyName("landing_type")]
        public string LandingType { get; init; } = string.Empty;
        
        [JsonPropertyName("landpad")]
        public string Landpad { get; init; } = string.Empty;
}

