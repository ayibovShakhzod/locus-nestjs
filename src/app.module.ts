import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';

@Module({
  imports: [UsecasesProxyModule.register(), ControllersModule, EnvironmentConfigModule],
  providers: [],
})
export class AppModule {}
