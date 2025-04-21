import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateListingFieldsInput {
  @Field(() => ID, { description: 'ID характеристики' })
  fieldId: string;

  @Field({ description: 'Значение характеристики' })
  value: string;
}
