import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFieldInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
