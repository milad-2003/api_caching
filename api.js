import axios from 'axios'
import Redis from 'ioredis'


const redis = new Redis({
    'port': 6379,
    'host': '127.0.0.1'
})


const cityEndpoint = (city) => `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.WEATHER_API_KEY}`


const getWeather = async (city) => {
    
    let apiResponse = await axios.get(cityEndpoint(city))

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
