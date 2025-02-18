import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsAuthPresenter } from './auth.presenter';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { LoginGuard } from 'src/infrastructure/common/guards/login.guard';
import { AuthLoginDto } from './auth-dto.class';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({
  status: 401,
  description: 'No autorization token was found',
})
@ApiResponse({
  status: 500,
  description: 'Internal server error',
})
@ApiExtraModels(IsAuthPresenter)
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USESCASES_PROXY)
    private readonly loginUsecasesProxy: UseCaseProxy<LoginUseCases>,
  ) {}

  @Post('login')
  @UseGuards(LoginGuard)
  @ApiBearerAuth()
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ description: 'login' })
  login(@Body() auth: AuthLoginDto) {
    console.log('🚀 ~ AuthController ~ login ~ auth:', auth);
    const accessTokenInfo = this.loginUsecasesProxy.getInstance().getJwtToken(auth.username);
    const refreshTokenInfo = this.loginUsecasesProxy.getInstance().getJwtRefreshToken(auth.username);

    return {
      accessToken: accessTokenInfo.token,
      refreshToken: refreshTokenInfo.token,
    };
  }
}
