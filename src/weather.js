export class weather {
    constructor(location, currWeather) {
        this.location = location;
        this.currWeather = currWeather;
    }

    location() {
        return this.location;
    };

    currWeather() {
        return this.currWeather;
    }
};