import { Controller, Get, Inject, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { getLocusUseCases } from 'src/usecases/locus/getLocus.usecases';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { RolesGuard } from 'src/infrastructure/common/guards/roles.guard';
import { AuthRequest } from '../auth/auth.types';
import { LocusFilterDto } from './locus-filter.dto';
import { Locus } from 'src/infrastructure/entities/locus.entity';

@Controller('locus')
@ApiTags('locus')
@ApiResponse({ status: 500, description: 'Internal Error' })
@ApiExtraModels(Locus)
export class LocusController {
  constructor(
    @Inject(UsecasesProxyModule.GET_LOCUS_USECASES_PROXY)
    private readonly getLocusUsecasesProxy: UseCaseProxy<getLocusUseCases>,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiResponseType(Locus)
  async getLocus(@Query() filterDto: LocusFilterDto, @Req() req: AuthRequest): Promise<Locus[]> {
    const userRole = req.user.role;
    return this.getLocusUsecasesProxy.getInstance().execute(filterDto, userRole);
  }
}
