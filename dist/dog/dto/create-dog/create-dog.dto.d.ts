import { Avatar, DogSize } from '../../entities/dog.entity';
export declare class CreateDogNameDto {
    readonly name: string;
    readonly userId: string;
}
export declare class CreateDogSizeDto {
    readonly dogSize: DogSize;
    readonly dogId: string;
    readonly userId: string;
}
export declare class CreateHeavyCoatDto {
    readonly heavyCoat: boolean;
    readonly dogId: string;
    readonly userId: string;
}
export declare class CreateColdAdaptDto {
    readonly coldAdapt: boolean;
    readonly dogId: string;
    readonly userId: string;
}
export declare class CreateLocationDto {
    readonly location: string;
    readonly dogId: string;
    readonly userId: string;
}
export declare class CreateSelectedAvatarDto {
    readonly selectedAvatar: Avatar;
    readonly dogId: string;
    readonly userId: string;
}
