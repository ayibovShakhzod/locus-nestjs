import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './environment-config.validation';
import { EnvironMentConfigService } from './environment-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validate,
    }),
  ],
  providers: [EnvironMentConfigService],
  exports: [EnvironMentConfigService],
})
export class EnvironmentConfigModule {}
