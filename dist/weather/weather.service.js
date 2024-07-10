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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const axios_1 = require("axios");
const common_1 = require("@nestjs/common");
let WeatherService = class WeatherService {
    constructor() { }
    async getWeather(city) {
        let weatherData;
        try {
            const key = process.env.WEATHER_API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
            await axios_1.default.get(url).then((res) => {
                const { data } = res;
                weatherData = data && {
                    weather: data.weather[0].main,
                    weatherId: data.weather[0].id,
                    description: data.weather[0].description,
                    temperature: data.main.temp,
                    humidity: data.main.humidity,
                    city: data.name,
                };
            });
        }
        catch (err) {
            console.log(err);
            throw new Error(`Error while fetching weather data for ${city}`);
        }
        return weatherData;
    }
};
exports.WeatherService = WeatherService;
exports.WeatherService = WeatherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], WeatherService);
//# sourceMappingURL=weather.service.js.map