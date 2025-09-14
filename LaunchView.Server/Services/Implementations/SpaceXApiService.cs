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
    
    public async Task<List<MissionDto>?> GetUpcomingMissionsAsync()
    {
        var missions = await _httpClient.GetFromJsonAsync<List<MissionDto>>("launches/upcoming");
        return missions;
    }
    
    public async Task<List<MissionDto>?> GetPastMissionsAsync()
    {
        var missions = await _httpClient.GetFromJsonAsync<List<MissionDto>>("launches/past");
        return missions;
    }
}