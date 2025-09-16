using LaunchView.Server.Services.Interfaces;
using LaunchView.Server.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LaunchView.Server.Controllers
{
    [Route("api/mission")]
    [ApiController]
  
    public class MissionController(ISpaceXApiService spaceXApiService, IAuthService _authService) : ControllerBase
    {
        
        [HttpGet("missions")]
        public async Task<ActionResult<IEnumerable<MissionDto>>> GetMissions()
        {
            List<MissionDto>? missions = await spaceXApiService.GetMissionsAsync("latest");
        
            if (missions == null || !missions.Any())
            {
                return NotFound("No missions were found.");
            }

            return Ok(missions);
        }
        
        
        [HttpGet("latest-mission")]
        public async Task<ActionResult<MissionDto>> GetLatestMission()
        {
            MissionDto? mission = await spaceXApiService.GetLatestMissionAsync(); 

            if (mission == null)
            {
                return NotFound("The latest mission was not found.");
            }

            return Ok(mission);
        }
        
        [HttpGet("upcoming-missions")]
        public async Task<ActionResult<MissionResponseDto>>  GetUpcomingMissions([FromQuery] PageParamsDto p)
        {
            var result = await spaceXApiService.GetMissionsQueryAsync(p, true);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpGet("past-missions")]
        public async Task<ActionResult<MissionResponseDto>>  GetPastMissions([FromQuery] PageParamsDto p)
        {
            var result = await spaceXApiService.GetMissionsQueryAsync(p, false);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<MissionDto>> GetMissionById(string id)
        {
            var mission = await spaceXApiService.GetMissionByIdAsync(id);

            if (mission == null)
            {
                return NotFound();
            }

            return Ok(mission);
        }
    }
}
