import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SearchListingsInput {
  @Field({ description: 'Название объявления' })
  name: string;
}
