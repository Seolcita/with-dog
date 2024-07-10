"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const registered_modules_1 = require("../registered-modules/registered-modules");
const GoogleStrategy_1 = require("./utils/GoogleStrategy");
const Serializer_1 = require("./utils/Serializer");
const auth_controller_1 = require("./auth.controller");
const GoogleToken_1 = require("./utils/GoogleToken");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [registered_modules_1.RegisteredModules],
        controllers: [auth_controller_1.AuthController],
        providers: [
            GoogleStrategy_1.GoogleStrategy,
            Serializer_1.SessionSerializer,
            {
                provide: 'GOOGLE_TOKEN',
                useClass: GoogleToken_1.GoogleToken,
            },
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map