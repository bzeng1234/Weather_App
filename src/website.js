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
                console.log(weather.currWeather);
                console.log(weather.location);
            });
        }
    };

    return {initialize};
};