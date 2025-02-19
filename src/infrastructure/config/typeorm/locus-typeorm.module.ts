import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';

export const getTypeOrmModuleOptions = (config: EnvironmentConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.getLocusDatabaseHost(),
  port: config.getLocusDatabasePort(),
  username: config.getLocusDatabaseUser(),
  password: config.getLocusDatabasePassword(),
  database: config.getLocusDatabaseName(),
  synchronize: config.getLocusDatabaseSync(),
  logNotifications: true,
});

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      name: 'locus-database',
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class LocusTypeOrmConfigModule {}
