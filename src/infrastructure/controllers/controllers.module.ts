import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { LocusController } from './locus/locus.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [LocusController, AuthController],
})
export class ControllersModule {}
