import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateListingInput } from './dto/create-listing.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Repository, In } from 'typeorm';
import { PagePagination } from '../common/dto/page-pagination.dto';
import { CategoryService } from 'src/category/category.service';
import { FiltersService } from 'src/listing/filters/filters.service';
import { FindListingsInput } from './dto/find-listings.input';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    private readonly categoryService: CategoryService,
    private readonly filtersService: FiltersService,
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

  public async findAllBySlugCategory(
    findListingsInput: FindListingsInput,
    slug: string,
  ) {
    const findCategory = await this.categoryService.findBySlug(slug);
    const findFilters = await this.filtersService.findAll({
      id: In(findListingsInput.filters),
    });

    if (!findCategory) {
      throw new BadRequestException('Такой категории не существует');
    }

    return await this.listingRepository.find({
      where: {
        categories: {
          slug,
        },
        ...(findFilters.length > 0 && {
          filters: {
            id: In(findFilters.map((filter) => filter.id)),
          },
        }),
      },
      skip: (findListingsInput.page - 1) * findListingsInput.perPage,
      take: findListingsInput.perPage,
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
