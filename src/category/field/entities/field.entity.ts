import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Category } from 'src/category/entities/category.entity';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class FieldEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: 'ID поля' })
  id: string;

  @Column()
  @Field({ description: 'Название поля' })
  name: string;

  @ManyToMany(() => Category, (category) => category.fields, {
    onDelete: 'CASCADE',
  })
  @Field(() => [Category], { description: 'Категории поля' })
  categories: Category[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field({ description: 'Дата создания' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field({ description: 'Дата последнего обновления' })
  updatedAt: Date;
}
