import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from '../listing/entities/listing.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker/locale/ru';
import { Category } from 'src/category/entities/category.entity';
import { generateSlug } from 'src/common/lib/generate-slug';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Listing)
    private listingRepository: Repository<Listing>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
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
    await this.listingRepository.query('TRUNCATE TABLE "listing" CASCADE');
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
