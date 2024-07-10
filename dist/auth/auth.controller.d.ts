import { Response } from 'express';
import { GoogleToken } from './utils/GoogleToken';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    private readonly googleToken;
    constructor(authService: AuthService, googleToken: GoogleToken);
    handleLogin(): {
        msg: string;
    };
    handleRedirect(req: any, res: Response): Promise<void>;
    getToken(res: Response): Promise<void>;
    getUserProfile(req: any): Promise<{
        accessToken: any;
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        photoUrl: string;
        location: string;
        dogs: [] | import("../dog/entities/dog.entity").DogProfile[];
    }>;
    logout(res: Response): Promise<void>;
    loginStatus(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
