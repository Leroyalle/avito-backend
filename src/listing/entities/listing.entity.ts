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

  @Field(() => User, { nullable: false })
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

  // _____________________________________________

  @Column({ nullable: true })
  @Field({ description: 'Тип товара' })
  productType?: string;

  @Column({ nullable: true })
  @Field({ description: 'Состояние товара' })
  condition?: string;

  @Column({ nullable: true })
  @Field(() => Int, { description: 'Год выпуска' })
  yearOfManufacture?: number;

  @Column({ nullable: true })
  @Field({ description: 'Производитель' })
  manufacturer?: string;

  @Column({ nullable: true })
  @Field({ description: 'Модель товара' })
  model?: string;

  @Column({ nullable: true })
  @Field({ description: 'Цвет товара' })
  color?: string;

  @Column({ nullable: true })
  @Field({ description: 'Размер товара' })
  size?: string;

  @Column({ nullable: true })
  @Field({ description: 'Вес товара' })
  weight?: string;

  @Column({ nullable: true })
  @Field({ description: 'Тип привода (для автомобилей)' })
  driveType?: string;

  @Column({ nullable: true })
  @Field(() => Int, { description: 'Километраж (для автомобилей)' })
  mileage?: number;

  @Column({ nullable: true })
  @Field(() => Int, { description: 'Количество комнат (для недвижимости)' })
  numberOfRooms?: number;

  @Column({ nullable: true })
  @Field(() => Int, { description: 'Этаж (для недвижимости)' })
  floor?: number;

  @Column({ nullable: true })
  @Field(() => Int, { description: 'Площадь товара или недвижимости' })
  area?: number;

  @Column({ nullable: true })
  @Field({ description: 'Материал (для мебели)' })
  material?: string;

  @Column({ nullable: true })
  @Field({ description: 'Тип подключения (для техники)' })
  connectionType?: string;

  @Column({ nullable: true })
  @Field(() => Int, {
    description: 'Объем памяти (для телефонов и компьютеров)',
  })
  memorySize?: number;

  @Column({ nullable: true })
  @Field({ description: 'Экологический класс (для автомобилей)' })
  environmentalClass?: string;

  @Column({ nullable: true })
  @Field({ description: 'Тип двигателя (для автомобилей)' })
  engineType?: string;
}
