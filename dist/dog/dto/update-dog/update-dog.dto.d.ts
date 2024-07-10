import { CreateColdAdaptDto, CreateDogNameDto, CreateDogSizeDto, CreateHeavyCoatDto, CreateSelectedAvatarDto } from '../create-dog/create-dog.dto';
export declare class UpdateDogNameDto extends CreateDogNameDto {
    readonly dogId: string;
}
export declare class UpdateDogSizeDto extends CreateDogSizeDto {
}
export declare class UpdateHeavyCoatDto extends CreateHeavyCoatDto {
}
export declare class UpdateColdAdaptDto extends CreateColdAdaptDto {
}
export declare class UpdateLocationDto {
    readonly location: string;
    readonly userId: string;
}
export declare class UpdateSelectedAvatarDto extends CreateSelectedAvatarDto {
}
