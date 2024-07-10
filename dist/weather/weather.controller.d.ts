import { WeatherService } from './weather.service';
import { WeatherData } from './entities/weather.entities';
export declare class WeatherController {
    private weatherService;
    constructor(weatherService: WeatherService);
    getWeather(city: string): Promise<WeatherData>;
}
