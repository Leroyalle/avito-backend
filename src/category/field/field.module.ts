import { Module } from '@nestjs/common';
import { FieldService } from './field.service';
import { FieldResolver } from './field.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldEntity } from './entities/field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FieldEntity])],
  providers: [FieldResolver, FieldService],
})
export class FieldModule {}
