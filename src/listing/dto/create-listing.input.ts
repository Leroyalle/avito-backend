import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { CreateListingFieldsInput } from './create-listing-fields.input';

@InputType()
export class CreateListingInput {
  @Field({ description: 'Название объявления' })
  name: string;

  @Field(() => Int, { description: 'Цена объявления' })
  price: number;

  @Field({ description: 'Описание объявления' })
  description: string;

  @Field(() => [String], { description: 'Изображения объявления' })
  images: string[];

  @Field(() => ID, { description: 'ID категории' })
  categoryId: string;

  @Field(() => [CreateListingFieldsInput], { description: 'Характеристики' })
  fields: CreateListingFieldsInput[];
}
