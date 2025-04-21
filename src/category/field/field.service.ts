import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryService } from '../category.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldEntity } from './entities/field.entity';
import { In, Repository } from 'typeorm';
import { CreateListingFieldsInput } from 'src/listing/dto/create-listing-fields.input';

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

  public async checkFieldsByCategory(categoryId: string, fieldIds: string[]) {
    const findCategory = await this.categoryService.findOne(categoryId);

    if (!findCategory) {
      throw new NotFoundException('Категория не найдена');
    }

    const findFields = await this.fieldRepository.find({
      where: {
        id: In(fieldIds),
      },
      relations: {
        categories: true,
      },
    });

    const filteredFields = findFields.filter((field) =>
      field.categories.some((category) => category.id === findCategory.id),
    );

    if (filteredFields.length !== fieldIds.length) {
      throw new NotFoundException(
        'Одно или несколько полей не найдены или не соответствуют категории',
      );
    }

    return findFields;
  }

  public formatFields(
    fields: FieldEntity[],
    fieldsDto: CreateListingFieldsInput[],
  ) {
    return fields.reduce((acc, field) => {
      const fieldValue = fieldsDto.find((f) => f.fieldId === field.id);

      if (fieldValue) {
        return {
          ...acc,
          [field.name]: fieldValue.value,
        };
      }
    }, []);
  }
}
