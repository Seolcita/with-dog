import { UserService } from './user.service';
import { UserProfile } from './entities/user.entity';
export declare class UserController {
    readonly userService: UserService;
    constructor(userService: UserService);
    getUserById(userId: string): Promise<UserProfile>;
}
