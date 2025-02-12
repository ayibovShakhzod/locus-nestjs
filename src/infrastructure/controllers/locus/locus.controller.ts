import { Controller, Get, Inject } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocusPresenter } from './locus.presenter';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { getLocusUseCases } from 'src/usecases/locus/getLocus.usecases';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';

@Controller('locus')
@ApiTags('locus')
@ApiResponse({ status: 500, description: 'Internal Error' })
@ApiExtraModels(LocusPresenter)
export class LocusController {
  constructor(
    @Inject(UsecasesProxyModule.GET_LOCUS)
    private readonly getLocusUsecasesProxy: UseCaseProxy<getLocusUseCases>,
  ) {}

  @Get()
  @ApiResponseType(LocusPresenter)
  async getLocus(): Promise<LocusPresenter[]> {
    const locus = await this.getLocusUsecasesProxy.getInstance().execute();
    const result = locus.map(l => new LocusPresenter(l));
    return result;
  }
}
