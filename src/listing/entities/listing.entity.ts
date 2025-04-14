import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Filter } from '../filters/entities/filter.entity';

@ObjectType()
@Entity()
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: 'ID объявления' })
  id: string;

  @Column()
  @Field({ description: 'Название объявления' })
  name: string;

  @Column()
  @Field(() => Int, { description: 'Цена объявления' })
  price: number;

  @Column()
  @Field({ description: 'Описание объявления' })
  description: string;

  @Column('text', { array: true })
  @Field(() => [String], { description: 'Изображения объявления' })
  images: string[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.listings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  @Field({ description: 'ID пользователя' })
  userId: string;

  @ManyToMany(() => Category, (listing) => listing.id, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'listing_categories',
    joinColumn: {
      name: 'listingId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'categoryId',
      referencedColumnName: 'id',
    },
  })
  @Field(() => [Category], { description: 'Категории объявления' })
  categories: Category[];

  @ManyToMany(() => Filter, (filter) => filter.id, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'listing_filters',
    joinColumn: {
      name: 'listingId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'filterId',
      referencedColumnName: 'id',
    },
  })
  @Field(() => [Filter], { description: 'Фильтр объявления' })
  filters: Filter[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field({ description: 'Дата создания объявления' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field({ description: 'Дата последнего обновления объявления' })
  updatedAt: Date;
}
