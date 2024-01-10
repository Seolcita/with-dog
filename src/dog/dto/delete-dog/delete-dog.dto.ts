import { IsString } from 'class-validator';

export class DeleteDogDto {
  @IsString()
  readonly dogId: string;

  @IsString()
  readonly userId: string;
}
