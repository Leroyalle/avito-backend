import { InputType, IntersectionType } from '@nestjs/graphql';
import { PagePagination } from 'src/common/dto/page-pagination.dto';
import { Filters } from './filters.input';

@InputType()
export class FindListingsInput extends IntersectionType(
  PagePagination,
  Filters,
) {}
