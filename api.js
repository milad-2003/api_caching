import axios from 'axios'


const cityEndpoint = (city) => `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.WEATHER_API_KEY}`


const getWeather = async (city) => {
    
    let apiResponse = await axios.get(cityEndpoint(city))

    return {...apiResponse.data, 'source' : 'API' }

}


async function printData(city) {
    let weather = await getWeather(city)
    console.log(weather)
}


const city = 'Fasa'
printData(city)
