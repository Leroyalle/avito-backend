import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Filter } from './entities/filter.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FiltersService {
  constructor(
    @InjectRepository(Filter)
    private readonly filtersRepository: Repository<Filter>,
  ) {}

  public async findAll(
    where?: FindOptionsWhere<Filter> | FindOptionsWhere<Filter>[],
  ) {
    return await this.filtersRepository.find({
      where,
    });
  }
}
