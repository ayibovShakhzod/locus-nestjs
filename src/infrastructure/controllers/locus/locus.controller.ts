import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocusPresenter } from './locus.presenter';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { getLocusUseCases } from 'src/usecases/locus/getLocus.usecases';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { RolesGuard } from 'src/infrastructure/common/guards/roles.guard';
import { AuthRequest } from '../auth/auth.types';
import { RoleEnum } from 'src/infrastructure/entities/role.enum';

@Controller('locus')
@ApiTags('locus')
@ApiResponse({ status: 500, description: 'Internal Error' })
@ApiExtraModels(LocusPresenter)
export class LocusController {
  constructor(
    @Inject(UsecasesProxyModule.GET_LOCUS_USECASES_PROXY)
    private readonly getLocusUsecasesProxy: UseCaseProxy<getLocusUseCases>,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiResponseType(LocusPresenter)
  async getLocus(@Req() req: AuthRequest): Promise<LocusPresenter[]> {
    const locus = await this.getLocusUsecasesProxy.getInstance().execute();
    const user = req.user;

    if (user.role.name === RoleEnum.ADMIN) {
      return locus.map(l => new LocusPresenter(l));
    }

    const result = locus.map(
      l =>
        new LocusPresenter({
          ...l,
          locusMembers: [],
        }),
    );
    return result;
  }
}
