import { Controller, Inject, Post, Req } from '@nestjs/common';
import { DogService } from './dog.service';
import { DogProfile } from './entities/dog.entity';

@Controller('dog')
export class DogController {
  constructor(
    @Inject('DOG_SERVICE')
    private dogService: DogService,
  ) {}

  @Post('name')
  async createDogName(@Req() request): Promise<DogProfile> {
    const { name, userId } = request.body;
    const dog = this.dogService.createDogName({ name, userId });
    return dog;
  }

  @Post('dog-size')
  async createDogSize(@Req() request): Promise<DogProfile> {
    const { dogId, dogSize, userId } = request.body;
    const dog = this.dogService.createDogSize({ dogId, dogSize, userId });
    return dog;
  }

  @Post('heavy-coat')
  async createHeavyCoat(@Req() request): Promise<DogProfile> {
    const { dogId, heavyCoat, userId } = request.body;
    const dog = this.dogService.createHeavyCoat({ dogId, heavyCoat, userId });
    return dog;
  }

  @Post('cold-adapt')
  async createColdAdapt(@Req() request): Promise<DogProfile> {
    const { dogId, coldAdapt, userId } = request.body;
    const dog = this.dogService.createColdAdapt({ dogId, coldAdapt, userId });
    return dog;
  }

  @Post('avatar-selection')
  async createAvatarSelection(@Req() request): Promise<DogProfile> {
    const { dogId, selectedAvatar, userId } = request.body;
    const dog = this.dogService.createAvatarSelection({
      dogId,
      selectedAvatar,
      userId,
    });
    return dog;
  }
}
