"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const GoogleToken_1 = require("./utils/GoogleToken");
const Guards_1 = require("./utils/Guards");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService, googleToken) {
        this.authService = authService;
        this.googleToken = googleToken;
    }
    handleLogin() {
        return { msg: 'Google Authentication' };
    }
    async handleRedirect(req, res) {
        const googleToken = req.user.accessToken;
        this.googleToken.setGoogleToken({
            accessToken: googleToken,
        });
        res.cookie('access_token', googleToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: false,
            path: '/',
        });
        res.redirect(process.env.REDIRECT_SIGNIN_SUCCESS_URL);
    }
    async getToken(res) {
        const token = this.googleToken.getGoogleToken();
        res.status(200).json({ token });
    }
    async getUserProfile(req) {
        const accessToken = req.body.accessToken;
        if (accessToken) {
            const googleUserProfile = await this.authService.getGoogleProfile(accessToken);
            const dbUserProfile = await this.authService.getOrCreateUser({
                email: googleUserProfile.data.email,
                firstName: googleUserProfile.data.given_name,
                lastName: googleUserProfile.data.family_name,
                photoUrl: googleUserProfile.data.picture,
            });
            const user = {
                ...dbUserProfile,
                accessToken,
            };
            return user;
        }
        else {
            throw new common_1.UnauthorizedException('No access token');
        }
    }
    async logout(res) {
        res.clearCookie('access_token');
        res.json({ LoggedOut: true });
    }
    async loginStatus(req, res) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.json({ loggedIn: false });
        }
        try {
            const isLogout = await this.authService.isTokenExpired(token);
            if (isLogout) {
                return res.json({ user: null, loggedIn: false });
            }
            else {
                const googleUserProfile = await this.authService.getGoogleProfile(token);
                if (req.query.email !== googleUserProfile.data.email) {
                    return res.status(403).json({ message: 'Unauthorized' });
                }
                const dbUserProfile = await this.authService.getUserByEmail(googleUserProfile.data.email);
                const user = {
                    ...dbUserProfile,
                };
                return res.json({ user, loggedIn: true });
            }
        }
        catch (error) {
            return res.json({ loggedIn: false });
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('google/login'),
    (0, common_1.UseGuards)(Guards_1.GoogleAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "handleLogin", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)(Guards_1.GoogleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleRedirect", null);
__decorate([
    (0, common_1.Get)('token'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getToken", null);
__decorate([
    (0, common_1.Post)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserProfile", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('login-status'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginStatus", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(0, (0, common_1.Inject)('AUTH_SERVICE')),
    __param(1, (0, common_1.Inject)('GOOGLE_TOKEN')),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        GoogleToken_1.GoogleToken])
], AuthController);
//# sourceMappingURL=auth.controller.js.map