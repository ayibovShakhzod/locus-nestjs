import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { LocusController } from './locus/locus.controller';
@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [AuthController, LocusController],
})
export class ControllersModule {}
