import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherData } from './entities/weather.entities';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query('city') city: string): Promise<WeatherData> {
    return await this.weatherService.getWeather(city);
  }
}
