import { Controller, Inject, Post, Req } from '@nestjs/common';
import { DogService } from './dog.service';

@Controller('dog')
export class DogController {
  constructor(
    @Inject('DOG_SERVICE')
    private dogService: DogService,
  ) {}

  @Post('name')
  createDogName(@Req() request) {
    const { name, userId } = request.body;
    const dog = this.dogService.createDogName({ name, userId });
    return dog;
  }

  @Post('dog-size')
  createDogSize(@Req() request) {
    const { dogId, dogSize, userId } = request.body;
    const dog = this.dogService.createDogSize({ dogId, dogSize, userId });
    return dog;
  }
}
