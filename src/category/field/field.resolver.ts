import { Resolver, Query, Args } from '@nestjs/graphql';
import { FieldService } from './field.service';
import { FieldEntity } from './entities/field.entity';

@Resolver(() => FieldEntity)
export class FieldResolver {
  constructor(private readonly fieldService: FieldService) {}

  @Query(() => [FieldEntity], { name: 'findAllByCategory' })
  findAllByCategory(@Args('categoryId') categoryId: string) {
    return this.fieldService.findAllByCategory(categoryId);
  }
}
