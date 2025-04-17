import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FieldEntity } from '../field/entities/field.entity';

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

  @ManyToMany(() => FieldEntity, (field) => field.categories, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'fields_categories',
    joinColumn: {
      name: 'categoryId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'fieldId',
      referencedColumnName: 'id',
    },
  })
  @Field(() => [FieldEntity], { description: 'Поля категории' })
  fields: FieldEntity[];

  @Column()
  @Field({ description: 'Лого категории' })
  image: string;
}
