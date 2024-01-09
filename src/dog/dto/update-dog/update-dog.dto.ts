import { IsString } from 'class-validator';
import {
  CreateDogNameDto,
  CreateDogSizeDto,
  CreateHeavyCoatDto,
  CreateLocationDto,
  CreateSelectedAvatarDto,
} from '../create-dog/create-dog.dto';

export class UpdateDogNameDto extends CreateDogNameDto {
  @IsString()
  readonly dogId: string;
}

export class UpdateDogSizeDto extends CreateDogSizeDto {}

export class UpdateHeavyCoatDto extends CreateHeavyCoatDto {}

export class UpdateColdAdaptDto extends CreateHeavyCoatDto {}

export class UpdateLocationDto extends CreateLocationDto {}

export class UpdateSelectedAvatarDto extends CreateSelectedAvatarDto {}