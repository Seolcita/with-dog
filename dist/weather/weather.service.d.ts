import { WeatherData } from './entities/weather.entities';
export declare class WeatherService {
    constructor();
    getWeather(city: string): Promise<WeatherData>;
}
