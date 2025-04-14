import { Resolver, Query } from '@nestjs/graphql';
import { FiltersService } from './filters.service';
import { Filter } from './entities/filter.entity';

@Resolver(() => Filter)
export class FiltersResolver {
  constructor(private readonly filtersService: FiltersService) {}

  @Query(() => [Filter], { name: 'filters' })
  findAll() {
    return this.filtersService.findAll();
  }
}
