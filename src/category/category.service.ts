import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  public async findAll() {
    return await this.categoryRepository.find();
  }

  public async findOne(id: string) {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  public async findBySlug(slug: string) {
    return await this.categoryRepository.findOne({ where: { slug } });
  }
}
