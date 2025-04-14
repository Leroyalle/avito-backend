import { CreateFilterInput } from './create-filter.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFilterInput extends PartialType(CreateFilterInput) {
  @Field(() => Int)
  id: number;
}
