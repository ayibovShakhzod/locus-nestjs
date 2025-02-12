import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironMentConfigService } from '../environment-config/environment-config.service';
import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';

export const getTypeOrmModuleOptions = (config: EnvironMentConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.getDatabaseHost(),
  port: config.getDatabasePort(),
  username: config.getDatabaseUser(),
  password: config.getDatabasePassword(),
  database: config.getDatabaseName(),
  synchronize: config.getDatabaseSync(),
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
export class TypeOrmConfigModule {}
