import { IsString } from 'class-validator';
import {
  CreateColdAdaptDto,
  CreateDogNameDto,
  CreateDogSizeDto,
  CreateHeavyCoatDto,
  CreateSelectedAvatarDto,
} from '../create-dog/create-dog.dto';

export class UpdateDogNameDto extends CreateDogNameDto {
  @IsString()
  readonly dogId: string;
}

export class UpdateDogSizeDto extends CreateDogSizeDto {}

export class UpdateHeavyCoatDto extends CreateHeavyCoatDto {}

export class UpdateColdAdaptDto extends CreateColdAdaptDto {}

export class UpdateLocationDto {
  @IsString()
  readonly location: string;

  @IsString()
  readonly userId: string;
}

export class UpdateSelectedAvatarDto extends CreateSelectedAvatarDto {}
