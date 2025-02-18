import { DynamicModule, Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseLocusRepository } from '../repositories/locus/locus.repository';
import { UseCaseProxy } from './usecases-proxy';
import { getLocusUseCases } from 'src/usecases/locus/getLocus.usecases';
import { JwtModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { EnvironMentConfigService } from '../config/environment-config/environment-config.service';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';

@Module({
  imports: [JwtModule, EnvironmentConfigModule, BcryptModule, RepositoriesModule],
})
export class UsecasesProxyModule {
  static GET_LOCUS_USECASES_PROXY = 'getLocusUsecasesProxy';

  static LOGIN_USESCASES_PROXY = 'loginUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [DatabaseLocusRepository],
          provide: UsecasesProxyModule.GET_LOCUS_USECASES_PROXY,
          useFactory: (locusRepository: DatabaseLocusRepository) =>
            new UseCaseProxy(new getLocusUseCases(locusRepository)),
        },
        {
          inject: [JwtTokenService, EnvironMentConfigService, DatabaseUserRepository, BcryptService],
          provide: UsecasesProxyModule.LOGIN_USESCASES_PROXY,
          useFactory: (
            jwtTokenService: JwtTokenService,
            config: EnvironMentConfigService,
            userRepository: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) => new UseCaseProxy(new LoginUseCases(jwtTokenService, config, userRepository, bcryptService)),
        },
      ],
      exports: [UsecasesProxyModule.GET_LOCUS_USECASES_PROXY, UsecasesProxyModule.LOGIN_USESCASES_PROXY],
    };
  }
}
