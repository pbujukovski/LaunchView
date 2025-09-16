using LaunchView.Server.Services.Interfaces;
using LaunchView.Server.ViewModels;

namespace LaunchView.Server.Services.Implementations;

public class SpaceXApiService : ISpaceXApiService
{
    private readonly HttpClient _httpClient;
    
    public SpaceXApiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri("https://api.spacexdata.com/v5/");
    }

    public async Task<List<MissionDto>> GetMissionsAsync(string missionType)
    {
        HttpResponseMessage response = await _httpClient.GetAsync("launches/" + missionType);
        
        if (response.IsSuccessStatusCode)
        {
            // Handle success
            return await response.Content.ReadFromJsonAsync<List<MissionDto?>>();
        }
        else
        {
            // Handle failure based on the status code
            if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                Console.WriteLine("API endpoint not found (404).");
            }
            else
            {
                Console.WriteLine($"An error occurred with status code: {response.StatusCode}");
            }
            return null;
        }
    }
    
    public async Task<MissionDto?> GetLatestMissionAsync()
    {
        var mission = await _httpClient.GetFromJsonAsync<MissionDto>("launches/latest");
        return mission;
    }
    
    public async Task<MissionDto?> GetMissionByIdAsync(string id)
    {
        var mission = await _httpClient.GetFromJsonAsync<MissionDto>($"launches/{id}");
        return mission;
    }
    
    public async Task<MissionResponseDto?> GetMissionsQueryAsync(PageParamsDto p, bool upcomingLaunches)
    {
        var options = new Dictionary<string, object?>
        {
            ["limit"] = p.PageSize,
            ["offset"] = p.PageIndex * p.PageSize
        };

        if (!string.IsNullOrEmpty(p.Sort) && !string.IsNullOrEmpty(p.Order))
        {
            options["sort"] = new Dictionary<string, string> { { p.Sort, p.Order } };
        }

        var query = new Dictionary<string, object?>
        {
            ["upcoming"] = upcomingLaunches
        };

        if (!string.IsNullOrWhiteSpace(p.Filter))
        {
            query["name"] = new Dictionary<string, object?>
            {
                ["$regex"] = p.Filter,
                ["$options"] = "i"
            };
        }

        var requestBody = new { options, query};
            var response = await _httpClient.PostAsJsonAsync(
                "https://api.spacexdata.com/v5/launches/query", 
                requestBody
            );

        response.EnsureSuccessStatusCode();

        var spacexData = await response.Content.ReadFromJsonAsync<MissionResponseDto>();

        return spacexData;
    }

}