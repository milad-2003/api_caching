import axios from 'axios'
import Redis from 'ioredis'


const redis = new Redis({
    'port': 6379,
    'host': '127.0.0.1'
})


const cityEndpoint = (city) => `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.WEATHER_API_KEY}`


const getWeather = async (city) => {

    // Check if we have a cached value of the city weather that we want
    let cacheEntry = await redis.get(`weather:${city}`)
    // cacheEntry would be a string

    // If we have a cache hit:
    if (cacheEntry) {
        // Converting the cacheEntry into json and returning it
        cacheEntry = JSON.parse(cacheEntry)
        return {...cacheEntry, 'source': 'cache'}
    }

    // Here we must have a cache miss
    // Calling api for response
    let apiResponse = await axios.get(cityEndpoint(city))

    // Storing the response in the cache
    redis.set(`weather:${city}`, JSON.stringify(apiResponse.data), 'EX', 3600)

    return {...apiResponse.data, 'source' : 'API' }

}


async function printData(city) {

    const t0 = new Date().getTime()
    let weather = await getWeather(city)
    const t1 = new Date().getTime()

    weather.responseTime = `${t1 - t0}ms`
    console.log(weather)
}


const city = 'Fasa'
printData(city)
