"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleToken = void 0;
const common_1 = require("@nestjs/common");
let GoogleToken = class GoogleToken {
    setGoogleToken({ accessToken }) {
        this.accessToken = accessToken;
    }
    getGoogleToken() {
        return { accessToken: this.accessToken };
    }
};
exports.GoogleToken = GoogleToken;
exports.GoogleToken = GoogleToken = __decorate([
    (0, common_1.Injectable)()
], GoogleToken);
//# sourceMappingURL=GoogleToken.js.map