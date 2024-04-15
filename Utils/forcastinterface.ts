interface Coord {
    lat: number;
    lon: number;
  }
  
  interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  }
  
  interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  interface Clouds {
    all: number;
  }
  
  interface Wind {
    speed: number;
    deg: number;
    gust: number;
  }
  
  interface Rain {
    '3h': number;
  }
  
  interface Sys {
    pod: string;
  }
  
  interface Forecast {
    dt: number;
    main: Main;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    rain?: Rain;
    sys: Sys;
    dt_txt: string;
  }
  
  interface City {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  }
  
  interface WeatherForecast {
    cod: string;
    message: number;
    cnt: number;
    list: Forecast[];
    city: City;
  }
  
export default WeatherForecast
  