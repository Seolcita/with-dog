import { IsObject, IsString } from 'class-validator';

import { Avatar, DogSize } from '../../entities/dog.entity';

export class CreateDogNameDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly userId: string;
}

export class CreateDogSizeDto {
  @IsString()
  readonly dogSize: DogSize;

  @IsString()
  readonly dogId: string;

  @IsString()
  readonly userId: string;
}

export class CreateHeavyCoatDto {
  @IsString()
  readonly heavyCoat: boolean;

  @IsString()
  readonly dogId: string;

  @IsString()
  readonly userId: string;
}

export class CreateColdAdaptDto {
  @IsString()
  readonly coldAdapt: boolean;

  @IsString()
  readonly dogId: string;

  @IsString()
  readonly userId: string;
}

export class CreateLocationDto {
  @IsString()
  readonly location: string;

  @IsString()
  readonly dogId: string;

  @IsString()
  readonly userId: string;
}

export class CreateSelectedAvatarDto {
  @IsObject()
  readonly selectedAvatar: Avatar;

  @IsString()
  readonly dogId: string;

  @IsString()
  readonly userId: string;
}
