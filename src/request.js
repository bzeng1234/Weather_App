import { weather } from "./weather";

export let request = () => {

    let makeRequest = async (city) => {
        try {
            let req = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=no`)
            let jsonResp = await req.json();
            return handleJson(jsonResp);
        } catch (error) {
            console.log(error);
        }
    };

    let handleJson = (json) => {
        let currWeather = new weather(json.location, json.current);
        return currWeather;
    };

    return {makeRequest, handleJson};
}