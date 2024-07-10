import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserProfile } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    getGoogleProfile(token: string): Promise<import("axios").AxiosResponse<any, any>>;
    isTokenExpired(token: string): Promise<boolean>;
    getOrCreateUser(userData: CreateUserDto): Promise<UserProfile>;
    getUserById(id: string): Promise<UserProfile>;
    getUserByEmail(email: string): Promise<UserProfile>;
}
