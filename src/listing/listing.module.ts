import { Module } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingResolver } from './listing.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { CategoryModule } from 'src/category/category.module';
import { FiltersModule } from './filters/filters.module';

@Module({
  imports: [TypeOrmModule.forFeature([Listing]), CategoryModule, FiltersModule],
  providers: [ListingResolver, ListingService],
})
export class ListingModule {}
