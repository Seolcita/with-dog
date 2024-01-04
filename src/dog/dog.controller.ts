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

  @Post('heavy-coat')
  createHeavyCoat(@Req() request) {
    const { dogId, heavyCoat, userId } = request.body;
    const dog = this.dogService.createHeavyCoat({ dogId, heavyCoat, userId });
    return dog;
  }

  @Post('cold-adapt')
  createColdAdapt(@Req() request) {
    const { dogId, coldAdapt, userId } = request.body;
    const dog = this.dogService.createColdAdapt({ dogId, coldAdapt, userId });
    return dog;
  }

  @Post('avatar-selection')
  createAvatarSelection(@Req() request) {
    const { dogId, selectedAvatar, userId } = request.body;
    const dog = this.dogService.createAvatarSelection({
      dogId,
      selectedAvatar,
      userId,
    });
    return dog;
  }
}
