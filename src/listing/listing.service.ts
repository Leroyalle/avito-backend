import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateListingInput } from './dto/create-listing.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Repository } from 'typeorm';
import { PagePagination } from './dto/page-pagination.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    private readonly categoryService: CategoryService,
  ) {}

  public async create(createListingInput: CreateListingInput) {
    return await this.listingRepository.save(createListingInput);
  }

  public async findAll(pagination: PagePagination) {
    return await this.listingRepository.find({
      skip: (pagination.page - 1) * pagination.perPage,
      take: pagination.perPage,
      relations: { user: true },
    });
  }

  public async findAllBySlugCategory(pagination: PagePagination, slug: string) {
    const findCategory = await this.categoryService.findBySlug(slug);

    if (!findCategory) {
      throw new BadRequestException('Такой категории не существует');
    }

    return await this.listingRepository.find({
      where: {
        categories: {
          slug,
        },
      },
      skip: (pagination.page - 1) * pagination.perPage,
      take: pagination.perPage,
      relations: { user: true },
    });
  }

  public async findOne(id: string) {
    return await this.listingRepository.findOne({
      where: {
        id,
      },
      relations: { user: true },
    });
  }

  public async getUserListings(userId: string, pagination: PagePagination) {
    return await this.listingRepository.find({
      where: {
        userId,
      },
      skip: (pagination.page - 1) * pagination.perPage,
      take: pagination.perPage,
      relations: { user: true },
    });
  }
}
