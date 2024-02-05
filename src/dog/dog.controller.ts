import { Response } from 'express';
import {
  Controller,
  Delete,
  Inject,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';

import { UserProfile } from '../user/entities/user.entity';
import { DogProfile } from './entities/dog.entity';
import { DogService } from './dog.service';

@Controller('dog')
export class DogController {
  constructor(
    @Inject('DOG_SERVICE')
    private dogService: DogService,
  ) {}

  //TODO: Remove console logs
  @Post('name')
  async createDogName(@Req() req): Promise<DogProfile> {
    const { name, userId } = req.body;
    if (!name || !userId) throw new Error('Missing name or userId');

    return this.dogService.createDogName({ name, userId });
  }

  @Post('dog-size')
  async createDogSize(@Req() req, @Res() res: Response): Promise<DogProfile> {
    const { dogId, dogSize, userId } = req.body;
    if (!dogId || !dogSize || !userId)
      throw new Error('Missing dogId, dogSize, or userId');

    const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
    if (dogOwnerId !== userId) {
      res.status(401).send('Unauthorized');
      return;
    }

    return this.dogService.createDogSize({ dogId, dogSize, userId });
  }

  @Post('heavy-coat')
  async createHeavyCoat(@Req() req, @Res() res: Response): Promise<DogProfile> {
    const { dogId, heavyCoat, userId } = req.body;
    if (!dogId || heavyCoat === undefined || !userId)
      throw new Error('Missing dogId, heavyCoat, or userId');

    const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
    if (dogOwnerId !== userId) {
      res.status(401).send('Unauthorized');
      return;
    }

    return this.dogService.createHeavyCoat({ dogId, heavyCoat, userId });
  }

  @Post('cold-adapt')
  async createColdAdapt(@Req() req, @Res() res: Response): Promise<DogProfile> {
    const { dogId, coldAdapt, userId } = req.body;
    if (!dogId || coldAdapt === undefined || !userId)
      throw new Error('Missing dogId, coldAdapt, or userId');

    const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
    if (dogOwnerId !== userId) {
      res.status(401).send('Unauthorized');
      return;
    }

    return this.dogService.createColdAdapt({ dogId, coldAdapt, userId });
  }

  @Post('location')
  async createLocation(@Req() req, @Res() res: Response): Promise<DogProfile> {
    const { dogId, location, userId } = req.body;
    if (!dogId || !location || !userId)
      throw new Error('Missing dogId, location, or userId');

    const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
    if (dogOwnerId !== userId) {
      res.status(401).send('Unauthorized');
      return;
    }

    return this.dogService.createLocation({ dogId, location, userId });
  }

  @Post('avatar-selection')
  async createAvatarSelection(
    @Req() req,
    @Res() res: Response,
  ): Promise<DogProfile> {
    const { dogId, selectedAvatar, userId } = req.body;
    if (!dogId || !selectedAvatar || !userId)
      throw new Error('Missing dogId, selectedAvatar, or userId');

    const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
    if (dogOwnerId !== userId) {
      res.status(401).send('Unauthorized');
      return;
    }

    return this.dogService.createAvatarSelection({
      dogId,
      selectedAvatar,
      userId,
    });
  }

  @Put('name/edit')
  async editDogName(@Req() req, @Res() res: Response): Promise<UserProfile> {
    const { name, userId, dogId } = req.body;
    if (!name || !userId || !dogId)
      throw new Error('Missing name, userId, or dogId');

    const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
    if (dogOwnerId !== userId) {
      res.status(401).send('Unauthorized');
      return;
    }

    return this.dogService.updateDogName({ name, userId, dogId });
  }

  @Put('dog-size/edit')
  async editDogSize(@Req() req, @Res() res: Response): Promise<UserProfile> {
    const { dogSize, userId, dogId } = req.body;
    if (!dogSize || !userId || !dogId)
      throw new Error('Missing dogSize, userId, or dogId');

    const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
    if (dogOwnerId !== userId) {
      res.status(401).send('Unauthorized');
      return;
    }

    return this.dogService.updateDogSize({ dogSize, userId, dogId });
  }

  @Put('heavy-coat/edit')
  async editHeavyCoat(@Req() req, @Res() res: Response): Promise<UserProfile> {
    const { heavyCoat, userId, dogId } = req.body;
    if (heavyCoat === undefined || !userId || !dogId)
      throw new Error('Missing heavyCoat, userId, or dogId');

    const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
    if (dogOwnerId !== userId) {
      res.status(401).send('Unauthorized');
      return;
    }

    return this.dogService.updateHeavyCoat({ heavyCoat, userId, dogId });
  }

  @Put('cold-adapt/edit')
  async editColdAdapt(@Req() req, @Res() res: Response): Promise<UserProfile> {
    const { coldAdapt, userId, dogId } = req.body;
    if (coldAdapt === undefined || !userId || !dogId)
      throw new Error('Missing coldAdapt, userId, or dogId');

    const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
    if (dogOwnerId !== userId) {
      res.status(401).send('Unauthorized');
      return;
    }

    return this.dogService.updateColdAdapt({ coldAdapt, userId, dogId });
  }

  @Put('avatar-selection/edit')
  async editAvatarSelection(
    @Req() req,
    @Res() res: Response,
  ): Promise<UserProfile> {
    const { selectedAvatar, userId, dogId } = req.body;
    if (!selectedAvatar || !userId || !dogId)
      throw new Error('Missing selectedAvatar, userId, or dogId');

    const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
    if (dogOwnerId !== userId) {
      res.status(401).send('Unauthorized');
      return;
    }

    return this.dogService.updateAvatarSelection({
      selectedAvatar,
      userId,
      dogId,
    });
  }

  @Put('location/edit')
  async editLocation(@Req() req): Promise<UserProfile> {
    const { location, userId } = req.body;
    if (!location || !userId)
      throw new Error('Missing dogId, location, or userId');

    return this.dogService.updateLocation({ location, userId });
  }

  @Delete('delete')
  async deleteDog(@Req() req, @Res() res: Response): Promise<UserProfile> {
    const { dogId, userId } = req.body;
    if (!dogId || !userId) throw new Error('Missing dogId,  or userId');

    const dogOwnerId = await this.dogService.getDogOwnerIdByDogId(dogId);
    if (dogOwnerId !== userId) {
      res.status(401).send('Unauthorized');
      return;
    }

    return this.dogService.deleteDog({ dogId, userId });
  }
}
