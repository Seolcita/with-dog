import { IsString } from 'class-validator';

export class CreateDogNameDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly userId: string;
}
