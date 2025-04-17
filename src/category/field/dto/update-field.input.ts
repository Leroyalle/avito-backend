import { CreateFieldInput } from './create-field.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFieldInput extends PartialType(CreateFieldInput) {
  @Field(() => Int)
  id: number;
}
