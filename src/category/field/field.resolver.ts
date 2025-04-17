import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FieldService } from './field.service';
import { FieldEntity } from './entities/field.entity';
import { CreateFieldInput } from './dto/create-field.input';
import { UpdateFieldInput } from './dto/update-field.input';

@Resolver(() => FieldEntity)
export class FieldResolver {
  constructor(private readonly fieldService: FieldService) {}

  @Mutation(() => FieldEntity)
  createField(@Args('createFieldInput') createFieldInput: CreateFieldInput) {
    return this.fieldService.create(createFieldInput);
  }

  @Query(() => [FieldEntity], { name: 'field' })
  findAll() {
    return this.fieldService.findAll();
  }

  @Query(() => FieldEntity, { name: 'field' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.fieldService.findOne(id);
  }

  @Mutation(() => FieldEntity)
  updateField(@Args('updateFieldInput') updateFieldInput: UpdateFieldInput) {
    return this.fieldService.update(updateFieldInput.id, updateFieldInput);
  }

  @Mutation(() => FieldEntity)
  removeField(@Args('id', { type: () => Int }) id: number) {
    return this.fieldService.remove(id);
  }
}
