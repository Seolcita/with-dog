import { Controller, Inject, Post, Put, Req } from '@nestjs/common';
import { DogService } from './dog.service';
import { DogProfile } from './entities/dog.entity';
import { UserProfile } from '../user/entities/user.entity';

@Controller('dog')
export class DogController {
  constructor(
    @Inject('DOG_SERVICE')
    private dogService: DogService,
  ) {}

  //TODO: Remove console logs
  @Post('name')
  async createDogName(@Req() request): Promise<DogProfile> {
    const { name, userId } = request.body;
    if (!name || !userId) throw new Error('Missing name or userId');

    return this.dogService.createDogName({ name, userId });
  }

  @Post('dog-size')
  async createDogSize(@Req() request): Promise<DogProfile> {
    const { dogId, dogSize, userId } = request.body;
    if (!dogId || !dogSize || !userId)
      throw new Error('Missing dogId, dogSize, or userId');

    return this.dogService.createDogSize({ dogId, dogSize, userId });
  }

  @Post('heavy-coat')
  async createHeavyCoat(@Req() request): Promise<DogProfile> {
    const { dogId, heavyCoat, userId } = request.body;
    if (!dogId || !heavyCoat || !userId)
      throw new Error('Missing dogId, heavyCoat, or userId');

    return this.dogService.createHeavyCoat({ dogId, heavyCoat, userId });
  }

  @Post('cold-adapt')
  async createColdAdapt(@Req() request): Promise<DogProfile> {
    const { dogId, coldAdapt, userId } = request.body;
    if (!dogId || !coldAdapt || !userId)
      throw new Error('Missing dogId, coldAdapt, or userId');

    return this.dogService.createColdAdapt({ dogId, coldAdapt, userId });
  }

  @Post('location')
  async createLocation(@Req() request): Promise<DogProfile> {
    const { dogId, location, userId } = request.body;
    if (!dogId || !location || !userId)
      throw new Error('Missing dogId, location, or userId');

    return this.dogService.createLocation({ dogId, location, userId });
  }

  @Post('avatar-selection')
  async createAvatarSelection(@Req() request): Promise<DogProfile> {
    const { dogId, selectedAvatar, userId } = request.body;
    if (!dogId || !selectedAvatar || !userId)
      throw new Error('Missing dogId, selectedAvatar, or userId');

    return this.dogService.createAvatarSelection({
      dogId,
      selectedAvatar,
      userId,
    });
  }

  @Put('name/edit')
  async editDogName(@Req() request): Promise<UserProfile> {
    const { name, userId, dogId } = request.body;
    if (!name || !userId || !dogId)
      throw new Error('Missing name, userId, or dogId');

    return this.dogService.updateDogName({ name, userId, dogId });
  }

  @Put('dog-size/edit')
  async editDogSize(@Req() request): Promise<UserProfile> {
    const { dogSize, userId, dogId } = request.body;
    if (!dogSize || !userId || !dogId)
      throw new Error('Missing dogSize, userId, or dogId');

    return this.dogService.updateDogSize({ dogSize, userId, dogId });
  }

  @Put('heavy-coat/edit')
  async editHeavyCoat(@Req() request): Promise<UserProfile> {
    const { heavyCoat, userId, dogId } = request.body;
    if (heavyCoat === undefined || !userId || !dogId)
      throw new Error('Missing heavyCoat, userId, or dogId');

    return this.dogService.updateHeavyCoat({ heavyCoat, userId, dogId });
  }
}
