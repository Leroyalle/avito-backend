import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
  ID,
} from '@nestjs/graphql';
import { ListingService } from './listing.service';
import { Listing } from './entities/listing.entity';
import { CreateListingInput } from './dto/create-listing.input';
import { User } from 'src/user/entities/user.entity';
import { PagePagination } from '../common/dto/page-pagination.dto';
import { FindListingsInput } from './dto/find-listings.input';
import { SearchListingsInput } from './dto/search-listings';

@Resolver(() => Listing)
export class ListingResolver {
  constructor(private readonly listingService: ListingService) {}

  @Mutation(() => Listing)
  createListing(
    @Args('createListingInput') createListingInput: CreateListingInput,
  ) {
    return this.listingService.create(createListingInput);
  }

  @Query(() => [Listing], { name: 'findAllListings' })
  findAll(@Args('pagePagination') pagination: PagePagination) {
    return this.listingService.findAll(pagination);
  }

  @Query(() => [Listing], { name: 'findAllBySlugCategory' })
  findAllBySlugCategory(
    @Args('findListingsInput') findListingsInput: FindListingsInput,
    @Args('slug') slug: string,
  ) {
    return this.listingService.findAllBySlugCategory(findListingsInput, slug);
  }

  @ResolveField(() => Listing, { name: 'getUserListings' })
  getUserListings(
    @Parent() user: User,
    @Args('pagePagination') pagination: PagePagination,
  ) {
    return this.listingService.getUserListings(user.id, {
      page: pagination.page,
      perPage: pagination.perPage,
    });
  }

  @Query(() => Listing, { name: 'findOneListing' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.listingService.findOne(id);
  }

  @Query(() => [Listing], { name: 'searchListings' })
  searchListings(
    @Args('searchListingsInput') searchListingsInput: SearchListingsInput,
  ) {
    return this.listingService.searchListings(searchListingsInput);
  }
}
