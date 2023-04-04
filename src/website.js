import { parse } from "date-fns/esm";
import { request } from "./request";

export let website = () => {

    let initialize = () => {
        let inputBtn = document.getElementById('city-button');
        inputBtn.addEventListener('click', handleInput);
    };

    let handleInput = () => {
        let inputForm = document.getElementById('city');
        if(inputForm.value.length === 0) {
            throwError('Input is empty');
        } else {
            let city = inputForm.value;
            let req = request();
            req.makeRequest(city)
            .then(weather => {
                makeVisible();
                updateWeather(weather.currWeather);
                updateLocation(weather.location);
            })
            .catch(error => {
                makeHidden();
                throwError('Could not find city. Please enter again');
            });
        }
    };

    let throwError = (error) => {
        let spanElem = document.querySelector('.error');
        spanElem.textContent = error;
    };

    let makeHidden = () => {
        let weatherContainer = document.querySelector('.weather');
        let locationContainer = document.querySelector('.location');

        weatherContainer.style.visibility = 'hidden';
        locationContainer.style.visibility = 'hidden';
    };

    let makeVisible = () => {
        let weatherContainer = document.querySelector('.weather');
        let locationContainer = document.querySelector('.location');

        weatherContainer.style.visibility = 'visible';
        locationContainer.style.visibility = 'visible';
    };

    let updateWeather = (weather) => {
        let weatherInfo = document.querySelector('.weather .info');
        weatherInfo.textContent = '';

        console.log(weather);

        let imgElem = document.createElement('img');
        imgElem.classList.add('weather-icon');
        imgElem.src = weather.condition.icon;
        weatherInfo.appendChild(imgElem);

        let conditionElem = document.createElement('p');
        conditionElem.classList.add('condition');
        conditionElem.textContent = weather.condition.text;
        weatherInfo.appendChild(conditionElem);

        let tempElem = document.createElement('p');
        tempElem.classList.add('temp_f');
        tempElem.textContent = `${weather.temp_f} \u00B0F`;
        weatherInfo.appendChild(tempElem);

        let humidElem = document.createElement('p');
        humidElem.classList.add('humidity');
        humidElem.textContent = `Humidity: ${weather.humidity}`;
        weatherInfo.appendChild(humidElem);

        let gustElem = document.createElement('p');
        gustElem.classList.add('wind');
        gustElem.textContent = `Wind: ${weather.wind_mph} ${weather.wind_dir}`;
        weatherInfo.appendChild(gustElem);
        
    };

    let updateLocation = (location) => {
        let locationInfo = document.querySelector('.location .info');
        locationInfo.textContent = '';
        
        let cityName = document.createElement('p');
        cityName.classList.add('city-name');
        cityName.textContent = location.name;
        locationInfo.appendChild(cityName);

        let currDate = parse(location.localtime, 'yyyy-MM-dd HH:mm', new Date());

        let dateElem = document.createElement('p'); 
        dateElem.classList.add('city-date');
        dateElem.textContent = currDate.toDateString();;
        locationInfo.appendChild(dateElem);

        let timeElem = document.createElement('p');
        timeElem.classList.add('city-time');
        timeElem.textContent = currDate.toLocaleTimeString();
        locationInfo.appendChild(timeElem);
    };

    return {initialize};
};