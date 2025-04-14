import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class Filters {
  @Field(() => [ID], { description: 'ID фильтров' })
  filters: string[];

  @Field(() => Int, {
    description: 'Минимальная цена фильтра',
    defaultValue: 0,
  })
  minPrice: number = 0;

  @Field(() => Int, {
    description: 'Максимальная цена фильтра',
    defaultValue: 0,
  })
  maxPrice: number = 0;
}
