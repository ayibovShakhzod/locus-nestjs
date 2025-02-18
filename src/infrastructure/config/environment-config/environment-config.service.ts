import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/domain/config/database.interface';
import { JwtConfig } from 'src/domain/config/jwt.interface';

@Injectable()
export class EnvironMentConfigService implements DatabaseConfig, JwtConfig {
  constructor(private configService: ConfigService) {}

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  getJwtRefreshTokenSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  getJwtRefreshTokenExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
  }

  getLocusDatabaseHost(): string {
    return this.configService.get<string>('LOCUS_DATABASE_HOST');
  }

  getLocusDatabasePort(): number {
    return this.configService.get<number>('LOCUS_DATABASE_PORT');
  }

  getLocusDatabaseUser(): string {
    return this.configService.get<string>('LOCUS_DATABASE_USER');
  }

  getLocusDatabasePassword(): string {
    return this.configService.get<string>('LOCUS_DATABASE_PASSWORD');
  }

  getLocusDatabaseName(): string {
    return this.configService.get<string>('LOCUS_DATABASE_NAME');
  }

  getLocusDatabaseSync(): boolean {
    return this.configService.get<boolean>('LOCUS_DATABASE_SYNCHRONIZE');
  }
}
