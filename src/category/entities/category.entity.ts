import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: 'ID категории' })
  id: string;

  @Column()
  @Field({ description: 'Название категории' })
  name: string;

  @Column({ unique: true })
  @Index()
  @Field({ description: 'Slug категории' })
  slug: string;

  @Column()
  @Field({ description: 'Лого категории' })
  image: string;
}
