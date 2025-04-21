import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from '../listing/entities/listing.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker/locale/ru';
import { Category } from 'src/category/entities/category.entity';
import { generateSlug } from 'src/common/lib/generate-slug';
import { FieldEntity } from 'src/category/field/entities/field.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Listing)
    private listingRepository: Repository<Listing>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(FieldEntity)
    private fieldRepository: Repository<FieldEntity>,
  ) {}

  public async run() {
    await this.clearListings();

    const createdUser = await this.userRepository.save({
      name: 'Leroyalle',
      email: 'leroyalle@example.com',
      password: 'password',
      refreshToken: null,
    });

    const categories = Array(18)
      .fill(0)
      .map(() => {
        const name = faker.commerce.department();
        return {
          name,
          slug: generateSlug(name) + `-${Math.floor(Math.random() * 1000)}`,
          image: faker.image.url(),
        };
      });

    const createdCategories = await this.categoryRepository.save(categories);

    const listingFieldsSeed = [
      {
        name: 'productType',
        categories: this.getRandomCategories(createdCategories, 4),
      },
      {
        name: 'condition',
        categories: this.getRandomCategories(createdCategories, 4),
      },
      {
        name: 'yearOfManufacture',
        categories: this.getRandomCategories(createdCategories, 4),
      },
      {
        name: 'manufacturer',
        categories: this.getRandomCategories(createdCategories, 4),
      },
      {
        name: 'model',
        categories: this.getRandomCategories(createdCategories, 4),
      },
      {
        name: 'color',
        categories: this.getRandomCategories(createdCategories, 4),
      },
      {
        name: 'size',
        categories: this.getRandomCategories(createdCategories, 4),
      },
      {
        name: 'weight',
        categories: this.getRandomCategories(createdCategories, 4),
      },
      {
        name: 'driveType',
        categories: this.getRandomCategories(createdCategories, 4),
      },
      {
        name: 'mileage',
        categories: this.getRandomCategories(createdCategories, 4),
      },
      {
        name: 'numberOfRooms',
        categories: this.getRandomCategories(createdCategories, 4),
      },
      {
        name: 'floor',
        categories: this.getRandomCategories(createdCategories, 4),
      },
      {
        name: 'area',
        categories: this.getRandomCategories(createdCategories, 4),
      },
      {
        name: 'material',
        categories: this.getRandomCategories(createdCategories, 4),
      },
      {
        name: 'connectionType',
        categories: this.getRandomCategories(createdCategories, 4),
      },
      {
        name: 'memorySize',
        categories: this.getRandomCategories(createdCategories, 4),
      },
      {
        name: 'environmentalClass',
        categories: this.getRandomCategories(createdCategories, 4),
      },
      {
        name: 'engineType',
        categories: this.getRandomCategories(createdCategories, 4),
      },
    ];

    await this.fieldRepository.save(listingFieldsSeed);

    const listingsData = Array(60)
      .fill(null)
      .map(() => ({
        name: faker.commerce.productName(),
        price: Math.floor(parseFloat(faker.commerce.price())),
        description: faker.lorem.paragraph(),
        images: [faker.image.url(), faker.image.url()],
        userId: createdUser.id,
        user: createdUser,
        categories: this.getRandomCategories(createdCategories, 2),
      }));

    await this.listingRepository.save(listingsData);

    console.log('Listings seeded');
  }

  private async clearListings() {
    await this.listingRepository.query(
      'TRUNCATE TABLE "listing_categories" CASCADE',
    );
    await this.fieldRepository.query('TRUNCATE TABLE "category" CASCADE');
    // await this.listingRepository.query('TRUNCATE TABLE "listing" CASCADE');
    await this.categoryRepository.query('TRUNCATE TABLE "category" CASCADE');
    await this.userRepository.query('TRUNCATE TABLE "user" CASCADE');
    console.log('Listings cleared');
  }

  private getRandomCategories = (
    categories: Category[],
    max: number,
  ): Category[] => {
    const shuffled = [...categories].sort(() => Math.random() - 0.5);
    const count = Math.floor(Math.random() * (max + 1));
    return shuffled.slice(0, count);
  };
}
