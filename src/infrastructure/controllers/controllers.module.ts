import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { LocusController } from './locus/locus.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [LocusController],
})
export class ControllersModule {}
