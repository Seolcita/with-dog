import { IsString } from 'class-validator';
import { DogSize } from '../../entities/dog.entity';

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
