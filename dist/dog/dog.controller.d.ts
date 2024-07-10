import { UserProfile } from '../user/entities/user.entity';
import { DogProfile } from './entities/dog.entity';
import { DogService } from './dog.service';
export declare class DogController {
    private dogService;
    constructor(dogService: DogService);
    createDogName(req: any): Promise<DogProfile>;
    createDogSize(req: any): Promise<DogProfile>;
    createHeavyCoat(req: any): Promise<DogProfile>;
    createColdAdapt(req: any): Promise<DogProfile>;
    createLocation(req: any): Promise<DogProfile>;
    createAvatarSelection(req: any): Promise<DogProfile>;
    editDogName(req: any): Promise<UserProfile>;
    editDogSize(req: any): Promise<UserProfile>;
    editHeavyCoat(req: any): Promise<UserProfile>;
    editColdAdapt(req: any): Promise<UserProfile>;
    editAvatarSelection(req: any): Promise<UserProfile>;
    editLocation(req: any): Promise<UserProfile>;
    deleteDog(req: any): Promise<UserProfile>;
}
