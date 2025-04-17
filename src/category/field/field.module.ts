import { forwardRef, Module } from '@nestjs/common';
import { FieldService } from './field.service';
import { FieldResolver } from './field.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldEntity } from './entities/field.entity';
import { CategoryModule } from '../category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FieldEntity]),
    forwardRef(() => CategoryModule),
  ],
  providers: [FieldResolver, FieldService],
})
export class FieldModule {}
