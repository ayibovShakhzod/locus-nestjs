import { DynamicModule, Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseLocusRepository } from '../repositories/locus/locus.repository';
import { UseCaseProxy } from './usecases-proxy';
import { getLocusUseCases } from 'src/usecases/locus/getLocus.usecases';

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule],
})
export class UsecasesProxyModule {
  static GET_LOCUS = 'getLocusUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [DatabaseLocusRepository],
          provide: UsecasesProxyModule.GET_LOCUS,
          useFactory: (locusRepository: DatabaseLocusRepository) =>
            new UseCaseProxy(new getLocusUseCases(locusRepository)),
        },
      ],
      exports: [UsecasesProxyModule.GET_LOCUS],
    };
  }
}
