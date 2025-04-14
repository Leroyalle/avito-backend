import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFilterInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
