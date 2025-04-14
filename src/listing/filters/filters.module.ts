import { Module } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { FiltersResolver } from './filters.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filter } from './entities/filter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Filter])],
  providers: [FiltersResolver, FiltersService],
  exports: [FiltersService],
})
export class FiltersModule {}
