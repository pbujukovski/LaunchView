namespace LaunchView.Server.Services.Interfaces;

public interface IHashService
{
    void CreatePasswordHash(string password, out byte[] hash, out byte[] salt);
    
    bool VerifyPassword(string password, byte[] storedHash, byte[] storedSalt);
}