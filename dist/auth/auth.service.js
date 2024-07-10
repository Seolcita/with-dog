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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    async getGoogleProfile(token) {
        try {
            return axios_1.default.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`);
        }
        catch (error) {
            console.error('Failed to get google profile:', error);
        }
    }
    async isTokenExpired(token) {
        try {
            const response = await axios_1.default.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`);
            const expiresIn = response.data.expires_in;
            if (!expiresIn || expiresIn <= 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.error('Failed to check if token is expired:', error);
            return true;
        }
    }
    async getOrCreateUser(userData) {
        return await this.userService.getOrCreateUser(userData);
    }
    async getUserById(id) {
        const user = await this.userService.getUserById(id);
        return user;
    }
    async getUserByEmail(email) {
        const user = await this.userService.getUserByEmail(email);
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map