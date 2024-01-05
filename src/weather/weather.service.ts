import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { WeatherData } from './entities/weather.entities';

@Injectable()
export class WeatherService {
  constructor() {}

  async getWeather(city: string): Promise<WeatherData> {
    let weatherData: WeatherData;
    try {
      const key = process.env.WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;

      await axios.get(url).then((res) => {
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
    } catch (err) {
      console.log(err);
      throw new Error(`Error while fetching weather data for ${city}`);
    }

    return weatherData;
  }
}
