import { request } from "./request";

export let website = () => {

    let initialize = () => {
        let inputBtn = document.getElementById('city-button');
        inputBtn.addEventListener('click', handleInput);
    };

    let handleInput = () => {
        let inputForm = document.getElementById('city');
        if(inputForm.value.length === 0) {
            console.log('input is empty');
        } else {
            let city = inputForm.value;
            let req = request();
            req.makeRequest(city)
            .then(weather => {
                updateWeather(weather.currWeather);
                updateLocation(weather.location);
            });
        }
    };

    let updateWeather = (weather) => {
        let weatherInfo = document.querySelector('.weather');

        console.log(weather);
        
        for(let info in weather) {
            weatherInfo.textContent += `${info}: ${weather[info]} \n`;
        }
    };

    let updateLocation = (location) => {
        let locationInfo = document.querySelector('.location');

        console.log(location);
        
        for(let info in location) {
            locationInfo.textContent += `${info}: ${location[info]} \n`;
        }
    };

    return {initialize};
};