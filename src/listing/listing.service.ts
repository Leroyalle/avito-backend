import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateListingInput } from './dto/create-listing.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Repository, In, Between } from 'typeorm';
import { PagePagination } from '../common/dto/page-pagination.dto';
import { CategoryService } from 'src/category/category.service';
import { FiltersService } from 'src/listing/filters/filters.service';
import { FindListingsInput } from './dto/find-listings.input';
import { SearchListingsInput } from './dto/search-listings';
import { FieldService } from 'src/category/field/field.service';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    private readonly categoryService: CategoryService,
    private readonly filtersService: FiltersService,
    private readonly fieldService: FieldService,
  ) {}

  public async create(createListingInput: CreateListingInput, userId: string) {
    const fieldIds = createListingInput.fields.map((field) => field.fieldId);
    const findFields = await this.fieldService.checkFieldsByCategory(
      createListingInput.categoryId,
      fieldIds,
    );

    const formattedFields = this.fieldService.formatFields(
      findFields,
      createListingInput.fields,
    );

    const { fields: _, ...listingInput } = createListingInput;

    return await this.listingRepository.save({
      ...listingInput,
      userId,
      ...formattedFields,
    });
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

        price: Between(findListingsInput.minPrice, findListingsInput.maxPrice),
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

  public async searchListings(searchListingsInput: SearchListingsInput) {
    return await this.listingRepository
      .createQueryBuilder('listing')
      .leftJoinAndSelect('listing.categories', 'categories')
      .where('LOWER(listing.name) LIKE LOWER(:name)', {
        name: `${searchListingsInput.name}%`,
      })
      .limit(10)
      .getMany();
  }
}
