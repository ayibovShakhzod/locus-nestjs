import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USESCASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
  ) {
    super();
  }

  async validate(username: string, password: string) {
    console.log('🚀 ~ LocalStrategy ~ validate ~ username:', username);
    if (!username || !password) {
      console.log('LocalStrategy', `Username or password is missing, BadRequestException`);
    }

    const user = await this.loginUsecaseProxy.getInstance().validateUserForLocalStragtegy(username, password);
    if (!user) {
      console.log('LocalStrategy', `Invalid username or password`);
    }
    return user;
  }
}
