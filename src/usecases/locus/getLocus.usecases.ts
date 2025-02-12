import { LocusM } from 'src/domain/model/locus';
import { LocusRepository } from 'src/domain/repositories/locusRepository.interface';

export class getLocusUseCases {
  constructor(private readonly locusRepository: LocusRepository) {}

  async execute(): Promise<LocusM[]> {
    return this.locusRepository.findAll();
  }
}
