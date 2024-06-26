# Caching
Simple API caching example with Redis!

## Prerequisites
- Node.js
- Redis
- axios
- ioredis
- [Open Weather Map API Key ](https://openweathermap.org/api)

## Installing this application

Clone the repository to your computer:

```bash
git clone https://github.com/milad-2003/api_caching
```

Install dependencies:
```bash
npm install 
```

Add the Open Weather Map API Key to your Environment Variables:
```bash
export WEATHER_API_KEY=<your api key>
```

## Database Preparation

Ensure you have Redis installed and running.

For Docker:
```bash
$ docker run -p 6379:6379 --name redis6 -d redis:6 
```

### `api.js`

This file contains logic to demonstrate caching entries from a weather service API.  You will need a free API key of your own to run this demonstration. You can get your own API key by following the [instructions at the Open WeatherMap API](https://openweathermap.org/api) site.  The `getWeather()` function retrieves a JSON object containing real-time meteorological information on a given city. This example uses Fasa, but you can use whichever city you like.

Ensure Redis is running, then run the `api.js` file once.  Since there is no cache entry, the code will retrieve the data from the Open Weather Map API.

```bash
$ node api.js
{
  coord: { lon: 53.6482, lat: 28.9383 },
  weather: [ { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' } ],
  ...
  source: 'API',
  responseTime: '580ms'
}
```

The code will have placed a copy of the entry in the Redis cache, so the next function call will return data from the cache. Note that the cached entry has a `TTL` (Time To Live) of one hour. Weather can change frequently, so an hour should provide a reasonable approximation of the current conditions. After an hour, the cache entry will be removed automatically, and a new cache entry will need to be stored. This ensures fresh, relevant data.

```bash
$ node api.js
{
  coord: { lon: 53.6482, lat: 28.9383 },
  weather: [ { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' } ],
  ...
  source: 'cache',
  responseTime: '9ms'
}
```
