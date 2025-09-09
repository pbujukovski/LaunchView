using System.Security.Cryptography;
using LaunchView.Server.Services.Interfaces;

namespace LaunchView.Server.Services.Implementations;

public class HashService : IHashService
{
    private const int SaltSize = 16;        // 128-bit
    private const int KeySize  = 32;        // 256-bit
    private const int Iterations = 100_000; // modern baseline

    public void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
    {
        salt = RandomNumberGenerator.GetBytes(SaltSize);
        using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256);
        hash = pbkdf2.GetBytes(KeySize);
    }

    public bool VerifyPassword(string password, byte[] storedHash, byte[] storedSalt)
    {
        using var pbkdf2 = new Rfc2898DeriveBytes(password, storedSalt, Iterations, HashAlgorithmName.SHA256);
        var computed = pbkdf2.GetBytes(KeySize);
        // Constant-time comparison
        return CryptographicOperations.FixedTimeEquals(computed, storedHash);
    }
}