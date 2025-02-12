import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironMentConfigService } from '../environment-config/environment-config.service';
import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';

export const getTypeOrmModuleOptions = (config: EnvironMentConfigService): TypeOrmModuleOptions => ({
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
      inject: [EnvironMentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class LocusTypeOrmConfigModule {}
