import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from '../listing/entities/listing.entity';
import { User } from '../user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { FieldEntity } from 'src/category/field/entities/field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Listing, User, Category, FieldEntity])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
