export interface JwtConfig {
  getJwtSecret(): string;
  getJwtExpirationTime(): string;
  getJwtRefreshTokenSecret(): string;
  getJwtRefreshTokenExpirationTime(): string;
}
