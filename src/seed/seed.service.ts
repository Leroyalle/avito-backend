import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from '../listing/entities/listing.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Listing)
    private listingRepository: Repository<Listing>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async run() {
    await this.clearListings();

    const createdUser = await this.userRepository.save({
      name: 'Leroyalle',
      email: 'leroyalle@example.com',
      password: 'password',
      refreshToken: null,
    });

    const listingsData = Array(60)
      .fill(null)
      .map(() => ({
        name: faker.commerce.productName(),
        price: Math.floor(parseFloat(faker.commerce.price())),
        description: faker.lorem.paragraph(),
        images: [faker.image.url(), faker.image.url()],
        userId: createdUser.id,
        user: createdUser,
      }));

    await this.listingRepository.save(listingsData);

    console.log('Listings seeded');
  }

  private async clearListings() {
    await this.listingRepository.query('TRUNCATE TABLE "listing" CASCADE');
    await this.userRepository.query('TRUNCATE TABLE "user" CASCADE');
    console.log('Listings cleared');
  }
}
