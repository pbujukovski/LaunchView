using LaunchView.Server.ViewModels;

namespace LaunchView.Server.Services.Interfaces;

public interface ISpaceXApiService
{
    Task<List<MissionDto>> GetMissionsAsync(string missionType);
    Task<MissionDto?> GetLatestMissionAsync();
    Task<MissionDto?> GetMissionByIdAsync(string id);
    Task<List<MissionDto>?> GetUpcomingMissionsAsync();
    Task<List<MissionDto>?> GetPastMissionsAsync();

    Task<MissionResponseDto> GetPastMissionsQueryAsync(PageParamsDto p);
}