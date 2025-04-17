import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryService } from '../category.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldEntity } from './entities/field.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FieldService {
  constructor(
    @InjectRepository(FieldEntity)
    private readonly fieldRepository: Repository<FieldEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  public async findAllByCategory(categoryId: string) {
    const findCategory = await this.categoryService.findOne(categoryId);

    if (!findCategory) {
      throw new NotFoundException('Категория не найдена');
    }

    return await this.fieldRepository.find({
      where: {
        categories: {
          id: findCategory.id,
        },
      },
    });
  }
}
